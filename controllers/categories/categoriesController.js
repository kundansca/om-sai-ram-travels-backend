const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../../models/Categories/Category");
exports.createCategory = asyncHandler(async (request, response, next) => {
  let { name } = request.body;
  const isCategoryPresent = await Category.findOne({ name });
  if (isCategoryPresent) {
    throw new Error("Category already existing");
  }
  const category = await Category.create({
    name: name,
    slug: slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    }),
    createdBy: request.userAuth?._id,
  });

  response.json({
    stauts: "success",
    message: "Category created successfully",
    data: category,
  });
});
