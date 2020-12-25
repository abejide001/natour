const express = require("express");

const authRouter = express.Router();
const reset = require("../middlewares/resetPassword");
const { protectRoute } = require("../middlewares/protectRoute");
const {
  passwordMatch,
  checkEmail,
  verifyPassword,
  checkEmailForForgotPassword,
  confirmPasswordForUpdate,
} = require("../middlewares/authMiddleware");
const {
  signUp,
  signIn,
  forgotPassword,
  resetPasssword,
  updatePassword,
  logout,
} = require("../controllers/AuthenticationController");

authRouter.post("/sign-up", passwordMatch, signUp);

authRouter.post("/sign-in", checkEmail, verifyPassword, signIn);

authRouter.get("/sign-out", logout);

authRouter.post(
  "/forget-password",
  checkEmailForForgotPassword,
  forgotPassword
);

authRouter.post("/reset/:token", passwordMatch, reset, resetPasssword);

authRouter.patch(
  "/update-password",
  protectRoute,
  confirmPasswordForUpdate,
  passwordMatch,
  updatePassword
);

module.exports = authRouter;
