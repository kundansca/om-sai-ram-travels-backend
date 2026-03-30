const asyncHandler = require("express-async-handler");
const User = require("../../models/Users/Users");
const bcrypt = require("bcryptjs");

exports.register = asyncHandler(async (request, response, next) => {
  const { name, email, password, role } = request.body;
  const user = await User.findOne({ email: email });
  if (user) {
    new Error("User Already existing");
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
