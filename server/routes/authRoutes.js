const express = require("express");
const { check } = require('express-validator');
const authController = require('../controllers/AuthController');


const router = express.Router();

router
  .route("/login")
  .post(
    [
      check("email").isEmail().withMessage("Email must not be empty"),
      check("password").notEmpty().withMessage("Password must not be empty")
    ],
    authController.login);

router.route("/logout").get([], authController.logout);

router
  .route("/signup")
  .post(
    [
      check("firstName").notEmpty().withMessage("First Name must not be empty"),
      check("lastName").notEmpty().withMessage("Last Name must not be empty"),
      check("email").isEmail().withMessage("Email must not be empty"),
      check("password").notEmpty().withMessage("Password must not be empty")
    ],
    authController.signup);

router
  .route('/forget-password')
  .post(
    [
      check("email").notEmpty().withMessage("Email must not be empty")
    ], authController.forgetPassword);

router
  .route('/password-reset-update/:userId/:token')
  .post(authController.resetPassword);

module.exports = router;