const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const utils = require('../utils');

const postMessage = async (
  req,
  res
) => {
  try {
    msg = req.body.email;
    msg = msg + "\n" + req.body.msg;
    const mail = await utils.sendEmail(process.env.contactMail, "Contact From Customer", msg);

    return res.json({
      msg: "Contact mail is sent successfully",
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

module.exports = { postMessage };