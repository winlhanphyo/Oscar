const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  country: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'shipping', 'delivered'],
    default: 'new'
  },
  totalAmount: {
    type: String,
    required: true
  },
  orderDetail: [{
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "orderDetail"
  }],
  created_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  updated_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
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
const Order = mongoose.model("order", orderSchema)
module.exports = Order;
