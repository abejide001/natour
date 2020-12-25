const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../models/User");
const { sendFailureResponse } = require("../utils/appResponse");

dotenv.config();

exports.protectRoute = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) return sendFailureResponse(res, 401, "Provide a token abeg");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id, iat } = decoded;

    // check if user still exist
    const freshUser = await User.findById(id).select([
      "-password",
      "-passwordResetExpires",
      "-passwordResetToken",
      "-passwordChangedAt",
    ]);
    if (!freshUser) return sendFailureResponse(res, 401, "User does not exist");
    if (freshUser.changedPasswordAfter(iat))
      return sendFailureResponse(res, 401, "Password changed, log in again");
    req.user = freshUser; // popluate req.user with logged in user info
    res.locals.user = freshUser;
  } catch (error) {
    return sendFailureResponse(res, 400, error.message);
  }
  next();
};
