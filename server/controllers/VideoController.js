const { validationResult } = require('express-validator');
const utils = require('../utils');
const Video = require("../models/Video");
const mongoose = require('mongoose');

/**
 * get video.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getVideo = async (
  req,
  res
) => {
  try {
    const page = req.query.page || 0;
    const videoPerPage = req.query.size || 5;
    const name = req.query.name || null;
    let condition = { deleted_at: null };
    name ? condition.name = { $regex: name, $options: 'i' } : null;
    const video = await Video.find(condition).skip(page * videoPerPage).limit(videoPerPage)
      .populate('created_user_id').populate('updated_user_id');
    const videoCount = await Video.find(condition).count();
    return res.json({
      data: video,
      count: videoCount,
      offset: page || 0,
      status: 1
    });
  } catch (err) {
    return res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.postErrorLogger.log('error', 'Error Video Lists')
  }
};

/**
 * get top video.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getTopVideo = async (req, res) => {
  try {
    const randomDocuments = await Video.aggregate([
      { $sample: { size: 1 } }, // Specify the number of random documents you want to retrieve
    ]);

    console.log('Random documents:', randomDocuments);

    return res.json({
      data: randomDocuments,
      status: 1
    });
  } catch (err) {
    return res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.postErrorLogger.log('error', 'Error Video Lists')
  }
}

/**
 * find video.
 * @param {*} req 
 * @param {*} res 
 */
const findVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('created_user_id').populate('updated_user_id');
    if (!video) {
      const error = Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    res.json({ data: video, status: 1 });
  } catch (err) {
    res
      .status(404)
      .json({ message: "Video not found!", status: 0 });
    // logger.postErrorLogger.log('error', 'Video Not Found!')
  }
};

/**
 * create video.
 * @param {*} req 
 * @param {*} res 
 */
const createVideo = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const videoData = {
      name: req.body.name,
      url: req.body.url,
      created_user_id: req.body.created_user_id,
    };
    const result = await Video.insertMany(videoData);
    res
      .status(201)
      .json({ message: "Created Successfully!", data: result, status: 1 });
  } catch (err) {
    console.log('Video Create API', err);
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // Logger Usage
    // logger.postLogger.log('warn', 'Error Create Post') 
    // logger.postInfoLogger.log('info', 'Error Create Category')
  }
}

/**
 * update video.
 * @param {*} req 
 * @param {*} res 
 */
const updateVideo = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const video = await Video.findById(req.params.id);
    if (!video) {
      const error = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }

    req.body?.name ? video.name = req.body.name : null;
    req.body?.url ? video.url = req.body.url : null;
    video.updated_user_id = req.body.updated_user_id;
    const result = await video.save();
    res.json({ message: "Updated video Successfully!", data: result, status: 1 });
  } catch (err) {
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.userErrorLogger.log('error', 'Error Update Video')
  }
}

/**
 * delete video.
 * @param {*} req 
 * @param {*} res 
 */
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      const error = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    video.deleted_at = new Date();
    await video.save();
    res.json({ message: "Deleted Successfully!", status: 1 });
  } catch (err) {
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.postErrorLogger.log('error', 'Error Delete Video')
  }
};

module.exports = { getVideo, findVideo, createVideo, deleteVideo, updateVideo, getTopVideo };