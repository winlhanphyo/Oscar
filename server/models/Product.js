const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category"
  },
  price: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'not available'],
    default: 'available'
  },
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
const Product = mongoose.model("product", productSchema)
module.exports = Product;
