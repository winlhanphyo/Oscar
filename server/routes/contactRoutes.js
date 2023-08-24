const express = require("express");
const { check } = require('express-validator');
const contactController = require('../controllers/ContactController');

const router = express.Router();

console.log('contact routes');

router
  .route("/")
  .post(
    [
      check("email").notEmpty().withMessage("Email must not be empty"),
      check("msg").notEmpty().withMessage("Message must not be empty")
    ],
    contactController.postMessage);

module.exports = router;