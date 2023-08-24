const express = require("express");
const { check } = require('express-validator');
const orderController = require('../controllers/OrderController');

const router = express.Router();

router
  .route("/")
  .get([], orderController.getOrder)
  .post(
    [
      check("customer").notEmpty().withMessage("User Id must not be empty"),
      check("firstName").notEmpty().withMessage("First Name must not be empty"),
      check("lastName").notEmpty().withMessage("Last Name must not be empty"),
      check("country").notEmpty().withMessage("Country must not be empty"),
      check("address").notEmpty().withMessage("Address must not be empty"),
      check("city").notEmpty().withMessage("City must not be empty"),
      check("postalCode").notEmpty().withMessage("Postal Code must not be empty"),
      check("phone").notEmpty().withMessage("Phone must not be empty"),
      check("orderDetail").notEmpty().withMessage("Order Detail must not be empty")
    ],
    orderController.createOrder);

router
  .route("/:id")
  .get(orderController.findOrder)
  .post(
    [
        check("firstName").notEmpty().withMessage("First Name must not be empty"),
        check("lastName").notEmpty().withMessage("Last Name must not be empty"),
        check("country").notEmpty().withMessage("Country must not be empty"),
        check("address").notEmpty().withMessage("Address must not be empty"),
        check("city").notEmpty().withMessage("City must not be empty"),
        check("postalCode").notEmpty().withMessage("Postal Code must not be empty"),
        check("phone").notEmpty().withMessage("Phone must not be empty")
    ],
    orderController.updateOrder)
  .delete(orderController.deleteOrder)

module.exports = router;