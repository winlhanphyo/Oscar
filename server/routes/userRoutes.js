const express = require("express");
const { check } = require('express-validator');
const userController = require('../controllers/UserController');

const router = express.Router();

router
  .route("/")
  .get([], userController.getUser)
  .post(
    [
      check("fistName").notEmpty().withMessage("First Name must not be empty"),
      check("lastName").notEmpty().withMessage("Last Name must not be empty"),
      check("email").notEmpty().withMessage("Email must not be empty"),
      check("password").notEmpty().withMessage("Password must not be empty"),
      check("type").notEmpty().withMessage("User Type must not be empty")
    ],
    userController.createUser);

router
  .route("/:id")
  .get(userController.findUser)
  .post(
    [
      check("fistName").notEmpty().withMessage("First Name must not be empty"),
      check("lastName").notEmpty().withMessage("Last Name must not be empty"),
      check("email").notEmpty().withMessage("Email must not be empty")
    ],
    userController.updateUser)
  .delete(userController.deleteUser)

router
  .route('/password-change/:userId')
  .post(userController.passwordChange);

module.exports = router;