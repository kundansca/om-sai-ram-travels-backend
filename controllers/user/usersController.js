const asyncHandler = require("express-async-handler");
const User = require("../../models/Users/Users");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
exports.register = asyncHandler(async (request, response, next) => {
  const { name, email, password, role } = request.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const error = new Error("User Already existing");
    next(error);
  }
  const newUser = new User({
    name,
    email,
    password,
    role,
  });
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  await newUser.save();
  response.status(201).send({
    status: "success",
    message: "User registered successfully",
    id: newUser?._id,
    name: newUser?.name,
    email: newUser?.email,
    role: newUser?.role,
  });
});
exports.getAllUsers = asyncHandler(async (request, response, next) => {
  const users = await User.find().select("-password");
  response.status(200).json({
    status: "success",
    message: "Users fetched successfully",
    count: users.length,
    data: users,
  });
});
exports.login = asyncHandler(async (request, response, next) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isMatched = await bcrypt.compare(password, user?.password);
  if (!isMatched) {
    throw new Error("Invalid credentials");
  }
  const token = generateToken(user);
  response.json({
    status: "success",
    message: "Logged in successfully",
    _id: user._id,
    email: user.email,
    role: user.role,
    name: user.name,
    token: token,
  });
});
