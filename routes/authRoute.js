const express = require("express")
const authRouter = express.Router()

const { passwordMatch, checkEmail, verifyPassword } = require("../middlewares/authMiddleware")
const { signUp, signIn, forgotPassword } = require("../controllers/AuthenticationController")


authRouter.post("/sign-up", passwordMatch, signUp)
authRouter.post("/sign-in", checkEmail, verifyPassword, signIn)
authRouter.post("/forget-password", checkEmail, forgotPassword)

module.exports = authRouter