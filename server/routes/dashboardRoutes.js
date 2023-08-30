const express = require("express");
const { check } = require('express-validator');
const dashboardController = require('../controllers/DashboardController');

const router = express.Router();

router
  .route("/")
  .get([], dashboardController.getDashboardData);

module.exports = router;