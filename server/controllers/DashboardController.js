const { validationResult } = require('express-validator');
const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");

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
    data.bestSellingProducts = await getBestSellingProducts();

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

    const totalOrders = await OrderDetail.aggregate([
      {
        $match: { deleted_at: null }
      }
    ]);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Assuming Sunday is the start of the week
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Calculate the sale amounts
    const calculateSaleAmount = (orders) => {
      return orders.reduce((totalSale, order) => {
        const qty = order.qty;
        const amount = order.amount;
        const saleAmount = qty * amount;
        return totalSale + saleAmount;
      }, 0);
    };

    const totalSaleAmount = calculateSaleAmount(totalOrders);

    const todaySaleAmount = calculateSaleAmount(orders);

    const thisWeekOrders = orders.filter(order => order.createdAt >= startOfWeek && order.createdAt <= endOfWeek);
    const thisWeekSaleAmount = calculateSaleAmount(thisWeekOrders);

    const thisMonthOrders = orders.filter(order => order.createdAt >= startOfMonth && order.createdAt <= endOfMonth);
    const thisMonthSaleAmount = calculateSaleAmount(thisMonthOrders);

    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59);

    const thisYearOrders = orders.filter(order => order.createdAt >= startOfYear && order.createdAt <= endOfYear);
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

const getBestSellingProducts = async () => {
  try {
    const bestSellingProducts = await OrderDetail.aggregate([
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
        $limit: 10 // Limit the result to the top 10 best selling products
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

    return bestSellingProducts;
  } catch (err) {
    throw new Error(err.toString())
  }
}

module.exports = { getDashboardData };