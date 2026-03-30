const mongoose = require("mongoose");
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected successfully to database");
  } catch (error) {
    console.log("connection to mongoDB failed", error.message);
  }
}
module.exports = connectDB;
