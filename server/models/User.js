const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User'
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
const User = mongoose.model("user", userSchema)
module.exports = User;
