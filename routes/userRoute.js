const express = require("express")
const userRouter = express.Router()

const { getAllUsers, createUser, updateUser, getUser, deleteUser } = require("../controllers/UserController")

userRouter.get("/", getAllUsers)

userRouter.post("/", createUser)

userRouter.patch("/:id", updateUser)

userRouter.get("/:id", getUser)

userRouter.delete("/:id", deleteUser)

module.exports = userRouter
