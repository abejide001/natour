const express = require("express");
const userRouter = express.Router();
const userImageUpload = require("../middlewares/userImageUpload");
const resizeUserPhoto = require("../middlewares/resizeUserPhoto");
const {
  getAllUsers,
  updateMe,
  deleteMe,
  getMe,
} = require("../controllers/UserController");
const { protectRoute } = require("../middlewares/protectRoute");
const { dontUpdatePassword } = require("../middlewares/userMiddleware");

userRouter.patch(
  "/update-me",
  protectRoute,
  dontUpdatePassword,
  userImageUpload,
  resizeUserPhoto,
  updateMe
);

userRouter.get("/me", protectRoute, getMe);

userRouter.get("/", protectRoute, getAllUsers);

userRouter.delete("/delete-me", protectRoute, deleteMe);

module.exports = userRouter;
