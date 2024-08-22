const User = require("../models/userModel");
const AppError = require("./../utils/AppError");
const asyncHandler = require("express-async-handler");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("-__v");
  res.status(200).json({
    status: "success",
    users,
  });
});
