const express = require("express")
const userRouter = express.Router()

const { getAllUsers, createUser, updateUser, getUser, deleteUser, updateMe, deleteMe } = require("../controllers/UserController")
const { protectRoute } = require("../middlewares/protectRoute")
const { dontUpdatePassword } = require("../middlewares/userMiddleware")

userRouter.get("/", getAllUsers)

userRouter.post("/", createUser)

userRouter.patch("/:id", updateUser)

userRouter.patch("/update-me", protectRoute, dontUpdatePassword, updateMe)

userRouter.delete("/delete-me", protectRoute, deleteMe)

userRouter.get("/:id", getUser)

userRouter.delete("/:id", deleteUser)

module.exports = userRouter
