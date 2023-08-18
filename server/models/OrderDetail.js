const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: false
  },
  deleted_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  deleted_at: {
    type: Date
  },
},
  {
    timestamps: true
  }
);
const OrderDetail = mongoose.model("orderDetail", orderDetailSchema)
module.exports = OrderDetail;
