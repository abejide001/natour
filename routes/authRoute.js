const express = require("express")
const authRouter = express.Router()

const { passwordMatch } = require("../middlewares/authMiddleware")
const { signUp } = require("../controllers/AuthenticationController")

authRouter.post("/sign-up", passwordMatch, signUp)

module.exports = authRouter