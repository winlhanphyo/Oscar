const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category"
  },
  artistName: {
    type: String
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
  quote: {
    type: String,
    required: true
  },
  dimension: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  technique: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: false
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
