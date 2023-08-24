const { validationResult } = require('express-validator');
const Order = require("../models/Order");
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');

const getOrder = async (
  req,
  res
) => {
  try {
    const page = req.query.page || 0;
    const orderPerPage = req.query.size || 5;
    const name = req.query.name || null;
    let condition = { deleted_at: null };
    let aggregatePipeline = [];
    if (name) {
      aggregatePipeline.push({
        $match: {
          $or: [
            { "customer.firstName": name },
            { "customer.lastName": name }
          ]
        }
      });
    };
    const order = await Order.aggregate([
      { $match: condition },
      ...aggregatePipeline,
      { $skip: page * orderPerPage },
      { $limit: Number(orderPerPage) },
      { $lookup: { from: 'users', localField: 'customer', foreignField: '_id', as: 'customer' } },
      { $lookup: { from: 'users', localField: 'created_user_id', foreignField: '_id', as: 'created_user_id' } },
      { $lookup: { from: 'users', localField: 'updated_user_id', foreignField: '_id', as: 'updated_user_id' } },
    ]);

    const orderCount = await Order.aggregate([
      { $match: condition },
      ...aggregatePipeline,
      { $count: 'count' } // Add this stage to count the matching documents
    ]);
    order.map((data) => {
      if (data?.customer) {
        data.customer = data.customer[0];
      }
    });

    return res.json({
      data: order,
      count: orderCount?.count,
      offset: page || 0,
      status: 1
    });
  } catch (err) {
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.postErrorLogger.log('error', 'Error Order Lists')
  }
};

const findOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate([{
        path: 'orderDetail',
        populate: {
          path: 'product',
          // model: 'product',
        }
      }]).populate('customer').populate('created_user_id').populate('updated_user_id');
    if (!order) {
      const error = Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    res.json({ data: order, status: 1 });
  } catch (err) {
    res
      .status(404)
      .json({ message: "Order not found!", status: 0 });
    // logger.postErrorLogger.log('error', 'Order Not Found!')
  }
};

const createOrder = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const orderData = req.body;
    const orderDetailData = await OrderDetail.insertMany(orderData.orderDetail);
    const productList = [];
    for (let i = 0; i < orderDetailData.length; i++) {
      const dist = orderDetailData[i];
      const product = await Product.findById(dist.product);
      productList.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: dist.qty,
      });
    }
    checkOut(productList, orderData, orderDetailData, res);
  } catch (err) {
    res.send("An error occured" + err.toString());
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // Logger Usage
    // logger.postLogger.log('warn', 'Error Create Post') 
    // logger.postInfoLogger.log('info', 'Error Create Order')
  }
}

const orderCreateData = async (orderData, orderDetailData, session, res) => {
  for (let i = 0; i < orderDetailData.length; i++) {
    const param = orderDetailData[i];
    const product = await Product.findById(param.product);
    if (param?.qty) {
      product.count = Number(product.count) - Number(param.qty);
      const response = await product.save();
    }
  }

  const orderDetailIds = orderDetailData.map((data) => data.id);
  orderData.orderDetail = orderDetailIds;
  const result = await Order.insertMany(orderData);
  res.json({ id: session.id });
}

const updateOrder = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const order = await Order.findById(req.params.id);
    if (!order) {
      const error = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    req.body?.firstName ? order.firstName = req.body.firstName : null;
    req.body?.lastName ? order.lastName = req.body.lastName : null;
    req.body?.country ? order.country = req.body.country : null;
    req.body?.company ? order.company = req.body.company : null;
    req.body?.address ? order.address = req.body.address : null;
    req.body?.additionalInfo ? order.additionalInfo = req.body.additionalInfo : null;
    req.body?.city ? order.city = req.body.city : null;
    req.body?.postalCode ? order.postalCode = req.body.postalCode : null;
    req.body?.phone ? order.phone = req.body.phone : null;
    req.body?.status ? order.status = req.body.status : null;
    order.updated_user_id = req.body.updated_user_id;
    const result = await order.save();
    res.json({ message: "Updated Successfully!", data: result, status: 1 });
  } catch (err) {
    res.status(400).json({
      message: error.toString(),
      success: false
    })
    // logger.postErrorLogger.log('info', 'Error Update Order!')
  }
}

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      const error = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    order.deleted_at = new Date();
    await order.save();
    res.json({ message: "Deleted Successfully!", status: 1 });
  } catch (err) {
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.postErrorLogger.log('error', 'Error Delete Order')
  }
};


const checkOut = async (productList, orderData, orderDetailData, res) => {
  try {
    console.log('product', productList);
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: productList,
      mode: "payment",
      // shipping_address_collection: {
      //   allowed_countries: ['US', 'SG', "IT"],
      // },
      // custom_text: {
      //   shipping_address: {
      //     message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
      //   },
      //   submit: {
      //     message: 'We\'ll email you instructions on how to get started.',
      //   },
      // },
      success_url: "http://localhost:3100/payment/success",
      cancel_url: "http://localhost:3100/payment/cancel",
    });
    orderCreateData(orderData, orderDetailData, session, res);
  } catch (err) {
    console.log('Stripe API Error', err);
    res.status(400).json({ msg: err.toString() });
  }
}

module.exports = { getOrder, findOrder, createOrder, deleteOrder, updateOrder };