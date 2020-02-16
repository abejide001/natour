const express = require("express")

const authRouter = express.Router()
const reset = require("../middlewares/resetPassword")
const { passwordMatch, checkEmail, verifyPassword, checkEmailForForgotPassword } = require("../middlewares/authMiddleware")
const { signUp, signIn, forgotPassword, resetPasssword } = require("../controllers/AuthenticationController")


authRouter.post("/sign-up", passwordMatch, signUp)
authRouter.post("/sign-in", checkEmail, verifyPassword, signIn)
authRouter.post("/forget-password", checkEmailForForgotPassword, forgotPassword)
authRouter.post("/reset/:token", reset, resetPasssword)

module.exports = authRouter