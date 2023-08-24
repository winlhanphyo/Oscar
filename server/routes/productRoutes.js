const express = require("express");
const { check } = require('express-validator');
const productController = require('../controllers/ProductController');

const router = express.Router();

router
  .route("/")
  .get([], productController.getProduct)
  .post(
    [
      check("name").notEmpty().withMessage("Product Name must not be empty"),
      check("description").notEmpty().withMessage("Description must not be empty"),
      check("category").notEmpty().withMessage("Category Id must not be empty"),
      check("price").notEmpty().withMessage("Price must not be empty"),
      check("count").notEmpty().withMessage("Count must not be empty"),
      // check("image").notEmpty().withMessage("Product Image must not be empty")
    ],
    productController.createProduct);

router
  .route("/:id")
  .get(productController.findProduct)
  .post(
    [
      check("name").notEmpty().withMessage("Name must not be empty"),
      check("description").notEmpty().withMessage("Description must not be empty"),
    ],
    productController.updateProduct)
  .delete(productController.deleteProduct)

router
  .route("/category/:id")
  .get(productController.getProductWithCategoryId)

module.exports = router;