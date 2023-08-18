const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const User = require("../models/User");

const getUser = async (
  req,
  res
) => {
  try {
    const page = req.query.page || 0;
    const userPerPage = req.query.size || 5;
    const name = req.query.name || null;
    let condition = { deleted_at: null };
    if (name) {
      condition.$and = [
        {
          $or: [
            { firstName: { $regex: name, $options: 'i' } },
            { lastName: { $regex: name, $options: 'i' } }
          ]
        }
      ];
    }
    const user = await User.find(condition).skip(page * userPerPage).limit(userPerPage)
      .populate('created_user_id').populate('updated_user_id');
    const userCount = await User.find(condition).count();

    return res.json({
      data: user,
      count: userCount,
      offset: page || 0,
      status: 1
    });
  } catch (err) {
    return res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.postErrorLogger.log('error', 'Error User Lists', err.toString());
  }
};

const findUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('created_user_id').populate('updated_user_id');
    if (!user) {
      const error = Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    res.json({ data: user, status: 1 });
  } catch (err) {
    res
      .status(404)
      .json({ message: "User not found!", status: 0 });
    // logger.postErrorLogger.log('error', 'User Not Found!')
  }
};

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
      created_user_id: req.body.created_user_id,
    }
    const result = await User.insertMany(userData);
    res
      .status(201)
      .json({ message: "Created Successfully!", data: result, status: 1 });
  } catch (err) {
    console.log('User Create API', err);
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // Logger Usage
    // logger.postLogger.log('warn', 'Error Create Post') 
    // logger.postInfoLogger.log('info', 'Error Create Category')
  }
}

const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    req.body?.firstName ? user.firstName = req.body.firstName : null;
    req.body?.lastName ? user.lastName = req.body.lastName : null;
    req.body?.email ? user.email = req.body.email : null;
    req?.body?.password ? user.password = req.body.password : null;
    req?.body?.type ? user.type = req.body.type : null;
    user.updated_user_id = req.body.updated_user_id;
    const result = await user.save();
    res.json({ message: "Updated User Successfully!", data: result, status: 1 });
  } catch (err) {
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.userErrorLogger.log('error', 'Error Update User')
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    user.deleted_at = new Date();
    await user.save();
    res.json({ message: "Deleted Successfully!", status: 1 });
  } catch (err) {
    res.status(400).json({
      message: err.toString(),
      success: false
    })
    // logger.postErrorLogger.log('error', 'Error Delete User')
  }
};

const passwordChange = async (req, res) => {
  try {
    await User.findById(req.params.userId)
      .then(async (user) => {
        if (!user) {
          return res.status(404).send({
            success: false,
            message: 'Could not find user'
          })
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.send({
            success: false,
            message: 'Incorrect password'
          });
        }

        if (bcrypt.compareSync(req.body.newPassword, user.password)) {
          return res.send({
            success: false,
            message: 'Current Password and New Password are same.'
          });
        }

        user.password = await bcrypt.hash(req.body.newPassword, 12);
        await user.save();
        res.json({ message: "Password Change Successfully!" });
      })
  } catch (error) {
    res.status(400).send("An error occured " + error.toString());
    // next(error)
  }
};

module.exports = { getUser, findUser, createUser, deleteUser, updateUser, passwordChange };