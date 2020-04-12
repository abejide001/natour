const express = require("express")
const userRouter = express.Router()

const { getAllUsers, createUser, deleteUser, updateMe, deleteMe, getMe } = require("../controllers/UserController")
const { protectRoute } = require("../middlewares/protectRoute")
const { dontUpdatePassword } = require("../middlewares/userMiddleware")

userRouter.patch("/update-me", protectRoute, dontUpdatePassword, updateMe)

userRouter.get("/me", protectRoute, getMe)

userRouter.get("/", protectRoute, getAllUsers)

userRouter.post("/", createUser)

userRouter.delete("/delete-me", protectRoute, deleteMe)

userRouter.delete("/:id", deleteUser)

module.exports = userRouter
