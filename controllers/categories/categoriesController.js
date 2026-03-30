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
exports.getAllCategories = asyncHandler(async (request, response, next) => {
  const categories = await Category.find({ isActive: true });
  response.json({
    status: "success",
    data: categories,
    message: "Categories fetched successfully",
  });
});
exports.deleteCategory = asyncHandler(async (request, response, next) => {
  const { slug } = request.params;
  const category = await Category.findOneAndDelete({ slug });
  console.log("category", category);
  if (!category) {
    return response.status(404).json({
      status: "failed",
      message: "Category not found",
    });
  }
  response.json({
    status: "success",
    message: "Cateogry deleted successfully",
    category,
  });
});

exports.updateCategory = asyncHandler(async (request, response, next) => {
  const { id } = request.params;
  const name = request.body.name;
  const category = await Category.findByIdAndUpdate(
    id,
    {
      name: name,
      slug: slugify(name, {
        strict: true,
        lower: true,
        trim: true,
      }),
    },
    {
      new: true,
      runValidators: true,
    },
  );

  response.json({
    status: "success",
    category,
    message: "Category updated successfully",
  });
});
