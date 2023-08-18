const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
},
  {
    timestamps: true
  }
);

passwordResetSchema.methods.deleteToken = async function() {
  await this.constructor.deleteOne({ _id: this._id });
};

const passwordReset = mongoose.model("passwordRest", passwordResetSchema)
module.exports = passwordReset;
