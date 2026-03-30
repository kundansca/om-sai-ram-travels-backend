const express = require("express");
const {
  register,
  login,
  getAllUsers,
} = require("../../controllers/user/usersController");
const isLoggedIn = require("../../models/Users/isLoggedIn");
const usersRouter = express.Router();
usersRouter.post("/", register);
usersRouter.post("/login", login);
usersRouter.get("/", isLoggedIn, getAllUsers);

module.exports = usersRouter;
