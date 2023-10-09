const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
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
const Video = mongoose.model("video", videoSchema)
module.exports = Video;
