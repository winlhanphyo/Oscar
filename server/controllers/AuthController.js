const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const crypto = require("crypto");
const User = require("../models/User");
const PasswordReset = require("../models/PasswordReset");
const utils = require('../utils');

const login = async (
  req,
  res
) => {
  let { email, password, type } = req.body;
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const condition = { email: email };
    type ? condition.type = type : null;
    console.log('condition', condition);
    User.findOne(condition).then(async (user) => {
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'Could not find user'
        })
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).send({
          success: false,
          messages: 'Incorrect password'
        });
      }

      const payload = {
        email: await bcrypt.hash(user.email, 12),
        id: user.id
      }

      const token = jwt.sign(payload, 'abcd', { expiresIn: '1d' });

      return res.status(200).send({
        success: true,
        message: 'Login Successfully!',
        user: user,
        token: token
      });
    }).catch((err) => {
      throw err;
    })
  } catch (error) {
    console.log("Login Error", error)
    res.status(400).json({
      message: error.toString(),
      success: false
    })
  }
};

const logout = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  let { email, password } = req.body;

  try {
    console.log("Logout", email, password);
    res.json({
      message: "Logout successful",
      success: true
    })
  } catch (error) {
    console.log("Logout Error", error)
    res.json({
      message: "Logout failed",
      success: false
    })
  }
};

const signup = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  let { firstName, lastName, email, password } = req.body;
  try {
    console.log(req.body.email);
    const user = new User({
      firstName,
      lastName,
      email,
      password: password ? await bcrypt.hash(req.body.password, 12) : null,
    });
    const result = await user.save();
    console.log("Signup", result);
    res.json({
      message: "Signup successful",
      success: true
    })
  } catch (error) {
    console.log("Signup Error", error)
    res.status(400).json({
      message: error.toString(),
      success: false
    })
  }
};

const forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("Email does not exist");

    let token = await PasswordReset.findOne({ email: req.body.email });
    if (!token) {
      token = await new PasswordReset({
        email: req.body.email,
        token: crypto.randomBytes(16).toString("hex"),
      }).save();
    }
    const link = `${process.env.BASE_URL}/admin/forget-password-update/${user._id}/${token.token}`;
    const msg = `Here is the password reset link \n ${link}`;
    const mail = await utils.sendEmail(user.email, "Oscar Password Reset", msg);

    res.status(200).json({
      message: "Password reset link sent to your email account."
    });
  } catch (error) {
    console.log('error');
    res.status(400).send("An error occured" + error.toString());
  }
}

const resetPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("User Id does not exist");

    const passwordReset = await PasswordReset.findOne({
      token: req.params.token
    });
    if (!passwordReset) return res.status(400).send("Invalid link or expired");

    user.password = await bcrypt.hash(req.body.password, 12);
    await user.save();
    console.log('password reset', passwordReset);
    await passwordReset.deleteToken();


    res.json({
      message: "Password reset sucessfully."
    });
  } catch (error) {
    res.status(400).send("An error occured " + error.toString());
  }
}

module.exports = { login, logout, signup, forgetPassword, resetPassword };
