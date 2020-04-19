const express = require("express")
const viewRouter = express.Router()
const { getOverview, getTour, getLoginForm, getAccount } = require("../controllers/ViewController")
const { protectRoute } = require("../middlewares/protectRoute")
const isLoggedIn = require("../middlewares/isLoggedIn")
const redirectToLogin = require("../middlewares/redirectToLogin")
const redirectToHome = require("../middlewares/redirectToHome")

viewRouter.get("/", isLoggedIn, getOverview)
viewRouter.get("/tour/:slug", isLoggedIn, getTour)
viewRouter.get("/login", isLoggedIn,  redirectToHome, getLoginForm)
viewRouter.get("/me", redirectToLogin, protectRoute, getAccount)

module.exports = viewRouter