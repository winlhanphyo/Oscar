const { validationResult } = require('express-validator');
const utils = require('../utils');
const Product = require("../models/Product");
const mongoose = require('mongoose');
const Category = require('../models/Category');

const getProduct = async (
  req,
  res
) => {
  try {
    const page = req.query.page || 0;
    const productPerPage = req.query.size || 5;
    const name = req.query.name || null;
    let condition = { deleted_at: null };
    name ? condition.name = { $regex: name, $options: 'i' } : null;
    const product = await Product.find(condition).skip(page * productPerPage).limit(productPerPage)
      .populate('category').populate('created_user_id').populate('updated_user_id');
    const productCount = await Product.find(condition).count();
    return res.json({
      data: product,
      count: productCount,
      offset: page || 0,
      status: 1
    });
  } catch (err) {
    return res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.postErrorLogger.log('error', 'Error Product Lists')
  }
};

const getTopProduct = async (req, res) => {
  try {
    // const category = await Category.findOne({ name: "Home" });
    // const products = await Product.find({ category: category?._id });

    const randomDocuments = await Product.aggregate([
      { $sample: { size: 10 } }, // Specify the number of random documents you want to retrieve
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
    // logger.postErrorLogger.log('error', 'Error Product Lists')
  }
}

const findProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category').populate('created_user_id').populate('updated_user_id');
    if (!product) {
      const error = Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    res.json({ data: product, status: 1 });
  } catch (err) {
    res
      .status(404)
      .json({ message: "Product not found!", status: 0 });
    // logger.postErrorLogger.log('error', 'Product Not Found!')
  }
};

const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    let image = req?.body?.image;
    console.log("file exists", req.files);
    if (req.files?.image?.length > 0) {
      image = req.files.image[0].path.replaceAll("\\", "/");
    }
    console.log('image', image);
    const productData = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      count: req.body.count,
      image,
      quote: req.body.quote,
      fullDescription: req.body.fullDescription,
      dimension: req.body.dimension,
      material: req.body.material,
      technique: req.body.technique,
      created_user_id: req.body.created_user_id,
    };
    req.body?.status ? productData.status = req.body.status : null;
    req.body.note ? productData.note = req.body.note : null;
    const result = await Product.insertMany(productData);
    res
      .status(201)
      .json({ message: "Created Successfully!", data: result, status: 1 });
  } catch (err) {
    console.log('Product Create API', err);
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // Logger Usage
    // logger.postLogger.log('warn', 'Error Create Post') 
    // logger.postInfoLogger.log('info', 'Error Create Category')
  }
}

const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      const error = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    let image = req.body.image;
    if (req.files) {
      if (req.files?.image?.length > 0) {
        image = req.files.image[0].path.replaceAll("\\", "/");
        if (product.image && product.image != image) {
          utils.deleteFile(product.image);
        }
        if (image) {
          product.image = image;
        }
      }
    }
    req.body?.name ? product.name = req.body.name : null;
    req.body.description ? product.description = req.body.description : null;
    req.body?.category ? product.category = req.body.category : null;
    req.body?.price ? product.price = req.body.price : null;
    req.body?.count ? product.count = req.body.count : null;
    product.updated_user_id = req.body.updated_user_id;
    req.body?.status ? product.status = req.body.status : null;

    req.body.quote ? product.quote = req.body.quote : null;
    req.body.fullDescription ? product.fullDescription = req.body.fullDescription : null;
    req.body.dimension ? product.dimension = req.body.dimension : null;
    req.body.material ? product.material = req.body.material : null;
    req.body.technique ? product.technique = req.body.technique : null;
    req.body.note ? product.note = req.body.note : null;
    const result = await product.save();
    res.json({ message: "Updated Product Successfully!", data: result, status: 1 });
  } catch (err) {
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.userErrorLogger.log('error', 'Error Update User')
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const error = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    product.deleted_at = new Date();
    await product.save();
    res.json({ message: "Deleted Successfully!", status: 1 });
  } catch (err) {
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.postErrorLogger.log('error', 'Error Delete Product')
  }
};

const getProductWithCategoryId = async (req, res) => {
  try {
    const catId = req.params.id
    const page = req.query.page || 0;
    const productPerPage = req.query.size || 5;
    const name = req.query.name || null;
    let condition = { deleted_at: null, category: new mongoose.Types.ObjectId(catId) };
    name ? condition.name = { $regex: name, $options: 'i' } : null;
    catId ? condition.category = new mongoose.Types.ObjectId(catId) : null;

    const product = await Product.find(condition).skip(page * productPerPage).limit(productPerPage)
      .populate('category').populate('created_user_id').populate('updated_user_id');
    const productCount = await Product.find(condition).count();

    return res.json({
      data: product,
      count: productCount,
      offset: page || 0,
      status: 1
    });
  } catch (err) {
    return res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.postErrorLogger.log('error', 'Error Product Lists')
  }
}

/**
 * download product image.
 * @param req 
 * @param res 
 */
const downloadProductImage = async (req, res) => {
  try {
    const path = "upload/product/" + req.params.filename;
    res.download(path);
  } catch (err) {
    console.log('download product image file error', err);
  }
}

module.exports = { getProduct, getProductWithCategoryId, findProduct, createProduct, deleteProduct, updateProduct, getTopProduct, downloadProductImage };