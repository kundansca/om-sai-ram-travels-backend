const jwt = require("jsonwebtoken");
const User = require("../../models/Users/Users");

const isLoggedIn = (request, response, next) => {
  const token = request.headers.authorization?.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
    if (error) {
      error = new Error(error?.message);
      next(error);
    }
    const userId = decoded?.user?.id;
    const user = User.findById(userId).select("name email role _id");
    request.userAuth = user;
    next();
  });
};
module.exports = isLoggedIn;
