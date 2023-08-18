const express = require("express");
const { check } = require('express-validator');
const categoryController = require('../controllers/CategoryController');

const router = express.Router();

console.log('category routes');

router
  .route("/")
  .get([], categoryController.getCategory)
  .post(
    [
      check("name").notEmpty().withMessage("Cateogry Name must not be empty")
    ],
    categoryController.createCategory);

    // router.route("/logout").get([], authController.logout);

router
  .route("/:id")
  .get(categoryController.findCategory)
  .post(
    [
      check("name").notEmpty().withMessage("Category Name must not be empty")
    ],
    categoryController.updateCategory)
  .delete(categoryController.deleteCategory)

module.exports = router;