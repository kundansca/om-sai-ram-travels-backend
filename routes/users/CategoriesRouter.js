const express = require("express");
const {
  createCategory,
} = require("../../controllers/categories/categoriesController");
const isLoggedIn = require("../../models/Users/isLoggedIn");
// const isLoggedIn = require("../../middlewares/isLoggedIn");

const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggedIn, createCategory);

module.exports = categoriesRouter;
