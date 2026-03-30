const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const {
  notFound,
  globalErrorHandler,
} = require("./middlewares/globalErrorHandler");
const usersRouter = require("./routes/users/usersRouter");
const categoriesRouter = require("./routes/users/CategoriesRouter");
dotenv.config();
//! Establish connection to mongodb
connectDB();
const app = express();
//? setup middleware
app.use(express.json());
//? Setup the user routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoriesRouter);
//? Not found Error handler
app.use(notFound);
//? Setup the global Error handler
app.use(globalErrorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port no ${PORT}`);
});
