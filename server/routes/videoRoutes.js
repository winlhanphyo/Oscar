const express = require("express");
const { check } = require('express-validator');
const videoController = require('../controllers/VideoController');

const router = express.Router();

router
  .route("/top")
  .get([], videoController.getTopVideo);

router
  .route("/")
  .get([], videoController.getVideo)
  .post(
    [
      check("name").notEmpty().withMessage("Video Name must not be empty"),
      check("url").notEmpty().withMessage("URL must not be empty")
    ],
    videoController.createVideo);

router
  .route("/:id")
  .get(videoController.findVideo)
  .post(
    [
      // check("name").notEmpty().withMessage("Name must not be empty"),
      // check("description").notEmpty().withMessage("Description must not be empty"),
    ],
    videoController.updateVideo)
  .delete(videoController.deleteVideo)

module.exports = router;