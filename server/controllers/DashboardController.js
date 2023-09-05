const { validationResult } = require('express-validator');
var mongoose = require('mongoose');
const Category = require('../models/Category');
const Order = require("../models/Order");
const Product = require("../models/Product");
const OrderDetail = require("../models/OrderDetail");
const User = require("../models/User");

const getDashboardData = async (
  req,
  res
) => {
  try {
    const data = {
      order: null,
      sale: null
    };

    data.order = await getOrderData();
    data.sale = await getSalesData();
    data.overview = await getOverviewData();
    data.bestSellingProducts = await getBestSellingProducts();
    data.graph = await getGraphData();

    return res.json({
      data,
      status: 1
    });
  } catch (err) {
    return res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.postErrorLogger.log('error', 'Error User Lists', err.toString());
  }
};

const getGraphData = async () => {
  try {
    const products = await getBestSellingProducts(5);
    const sales = await getGraphSales();
    let data = {};
    data.product = products;
    data.sales = sales;
    return data;
  } catch (err) {
    throw new Error(err.toString());
    // logger.postErrorLogger.log('error', 'Error Product Lists')
  }
}

const getOrderData = async () => {
  try {
    // Calculate counts for today, weekly, and monthly
    const today = new Date();

    const totalCount = await Order.countDocuments({
      deleted_at: null
    });

    const todayCount = await Order.countDocuments({
      deleted_at: null,
      createdAt: { $gte: today.setHours(0, 0, 0, 0) }
    });

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Assuming Sunday is the start of the week
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

    // Get the start and end of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Get the start and end of the current year
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59); // End of December

    const thisWeekCount = await Order.countDocuments({
      deleted_at: null,
      createdAt: { $gte: startOfWeek, $lte: endOfWeek }
    });

    const thisMonthCount = await Order.countDocuments({
      deleted_at: null,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });

    const thisYearCount = await Order.countDocuments({
      deleted_at: null,
      createdAt: { $gte: startOfYear, $lte: endOfYear }
    });

    return {
      totalCount,
      todayCount,
      thisWeekCount,
      thisMonthCount,
      thisYearCount
    };
  } catch (err) {
    throw new Error(err.toString())
  }
}

// Calculate the sale amounts
const calculateSaleAmount = (orders) => {
  return orders.reduce((totalSale, order) => {
    const qty = order.qty;
    const amount = order.amount;
    const saleAmount = qty * amount;
    return totalSale + saleAmount;
  }, 0);
};

const getSalesData = async () => {
  try {
    const today = new Date();
    var startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    let condition = {
      createdAt: { $gte: startOfToday }
    };

    const orders = await OrderDetail.aggregate([
      { $match: condition }
    ]);

    const totalOrders = await OrderDetail.find({
      deleted_at: null,
      payment: true,
    });

    const totalSaleAmount = calculateSaleAmount(totalOrders);

    const todaySaleAmount = calculateSaleAmount(orders);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Assuming Sunday is the start of the week
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

    // const thisWeekOrders = orders.filter(order => order.createdAt >= startOfWeek && order.createdAt <= endOfWeek);
    const thisWeekOrders = await OrderDetail.find({
      deleted_at: null,
      createdAt: { $gte: startOfWeek, $lte: endOfWeek }
    });
    const thisWeekSaleAmount = calculateSaleAmount(thisWeekOrders);

    // Get the start and end of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const thisMonthOrders = await OrderDetail.find({
      deleted_at: null,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });

    // console.log('thisMonthOrders', thisMonthOrders);
    const thisMonthSaleAmount = calculateSaleAmount(thisMonthOrders);

    console.log('thisMonthSaleAmount', thisMonthSaleAmount);

    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59);


    const thisYearOrders = await OrderDetail.find({
      deleted_at: null,
      createdAt: { $gte: startOfYear, $lte: endOfYear }
    });
    const thisYearSaleAmount = calculateSaleAmount(thisYearOrders);

    return {
      totalSaleAmount,
      todaySaleAmount,
      thisWeekSaleAmount,
      thisMonthSaleAmount,
      thisYearSaleAmount
    };
  } catch (err) {
    throw new Error(err.toString())
  }
}

const getGraphSales = async () => {
  // Get the start and end of the current month
  const today = new Date();
  console.log('month', today.getMonth());
  const months = [
    [1, 4],
    [4, 7],
    [7, 10],
    [10, 13]
  ];
  const labels = [
    "Jan-Mar",
    "Apr-Jun",
    "July-Sept",
    "Oct-Dec"
  ];
  const saleAmount = [];

  for (let i = 0; i < months.length; i++) {
    const startOfMonth = new Date(today.getFullYear(), months[i][0], 1);
    const endOfMonth = months[i][1] === 13 ? new Date(today.getFullYear() + 1, 1, 0)
      : new Date(today.getFullYear(), months[i][1], 0);

    const thisMonthOrders = await OrderDetail.find({
      deleted_at: null,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });

    const thisMonthSaleAmount = calculateSaleAmount(thisMonthOrders);
    console.log('this month sale amount', thisMonthSaleAmount);
    saleAmount.push(thisMonthSaleAmount);
  }

  return {
    labels,
    saleAmount
  }

}

const getBestSellingProducts = async (limit = 10) => {
  try {
    const today = new Date();
const startOfYear = new Date(today.getFullYear(), 0, 1);
const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59);

// Find orders for the year with payment=true
const orders = await Order.find({
  deleted_at: null,
  payment: true,
  createdAt: { $gte: startOfYear, $lte: endOfYear }
});

// Extract order IDs and convert them to ObjectIds
const orderDetailIdList = orders.map((order) => new mongoose.Types.ObjectId(order.orderDetail.toString()));

console.log('orderDetailIdList: ', orderDetailIdList);

const condition = {
  $match: {
    deleted_at: null,
    createdAt: { $gte: startOfYear, $lte: endOfYear },
    "_id": { $in: orderDetailIdList } // Use $in with an array of order IDs
  }
};

const bestSellingProducts = await OrderDetail.aggregate([
  {
    ...condition
  },
  {
    $group: {
      _id: "$product", // Group by product
      totalQuantity: { $sum: "$qty" }, // Calculate total quantity sold
      totalAmount: { $sum: { $multiply: ["$qty", "$amount"] } } // Calculate total amount sold
    }
  },
  {
    $sort: {
      totalQuantity: -1 // Sort by total quantity in descending order
    }
  },
  {
    $limit: limit // Limit the result to the top 10 best selling products
  },
  {
    $lookup: {
      from: "products", // Replace with the name of your products collection
      localField: "_id",
      foreignField: "_id",
      as: "product"
    }
  },
  {
    $unwind: "$product"
  },
  {
    $lookup: {
      from: "categories", // Replace with the name of your categories collection
      localField: "product.category", // Adjust based on the field that represents the category ID in your product object
      foreignField: "_id",
      as: "product.category"
    }
  },
  {
    $unwind: "$product.category"
  },
  {
    $project: {
      _id: 0,
      product: 1, // Include the entire product object with category data
      totalQuantity: 1,
      totalAmount: 1
    }
  }
]);

console.log(bestSellingProducts);


    return bestSellingProducts;
  } catch (err) {
    throw new Error(err.toString())
  }
}

const getOverviewData = async () => {
  try {
    const categoryCount = await Category.countDocuments({
      deleted_at: null
    });

    const productCount = await Product.countDocuments({
      deleted_at: null
    });

    const userCount = await User.countDocuments({
      deleted_at: null,
      type: "User"
    });

    return {
      categoryCount,
      productCount,
      userCount
    }
  } catch (err) {
    throw new Error(err.toString());
  }

}

module.exports = { getDashboardData };