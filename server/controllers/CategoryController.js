const { validationResult } = require('express-validator');
const Category = require("../models/Category");

const getCategory = async (
  req,
  res
) => {
  try {
    const page = req.query.page || 0;
    const categoryPerPage = req.query.size || 5;
    const name = req.query.name || null;
    let condition = { deleted_at: null };
    name ? condition.name = {$regex: name, $options: 'i'} : null;
    let category = null;
    if (categoryPerPage !== "all") {
      category = await Category.find(condition).skip(page * categoryPerPage).limit(categoryPerPage).populate('created_user_id').populate('updated_user_id');
    } else {
      category = await Category.find(condition).populate('created_user_id').populate('updated_user_id');
    }
    const categoryCount = await Category.find(condition).count();
    return res.json({
      data: category,
      count: categoryCount,
      offset: page || 0,
      status: 1
    });
  } catch (err) {
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.postErrorLogger.log('error', 'Error Category Lists')
  }
};

const findCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('created_user_id').populate('updated_user_id');
    if (!category) {
      const error = Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    res.json({ data: category, status: 1 });
  } catch (err) {
      res
        .status(404)
        .json({ message: "Category not found!", status: 0 });
    // logger.postErrorLogger.log('error', 'Category Not Found!')
  }
};

const createCategory = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const categoryData = req.body;
    const result = await Category.insertMany(categoryData);
    res
      .status(201)
      .json({ message: "Created Successfully!", data: result, status: 1 });
  } catch (err) {
    res.send("An error occured");
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // Logger Usage
    // logger.postLogger.log('warn', 'Error Create Post') 
    // logger.postInfoLogger.log('info', 'Error Create Category')
  }    
}

const updateCategory = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const category = await Category.findById(req.params.id);
    if (!category) {
      const error = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    category.name = req.body.name;
    req.body.status ? category.status = req.body.status : null;
    category.updated_user_id = req.body.updated_user_id;
    const result = await category.save();
    res.json({ message: "Updated Successfully!", data: result, status: 1 });
  } catch (err) {
    res.status(400).json({
      message: error.toString(),
      success: false
    })
    // logger.postErrorLogger.log('info', 'Error Update Category!')
  }
  }

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      const error = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    category.deleted_at = new Date();
    await category.save();
    res.json({ message: "Deleted Successfully!", status: 1 });
  } catch (err) {
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.postErrorLogger.log('error', 'Error Delete Category')
  }
};

module.exports = { getCategory, findCategory, createCategory, deleteCategory, updateCategory};