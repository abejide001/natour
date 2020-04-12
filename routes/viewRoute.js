const express = require("express")
const viewRouter = express.Router()
const { getOverview, getTour, getLoginForm, getAccount } = require("../controllers/ViewController")
const { protectRoute } = require("../middlewares/protectRoute")
const isLoggedIn = require("../middlewares/isLoggedIn")

viewRouter.get("/", isLoggedIn, getOverview)
viewRouter.get("/tour/:slug", isLoggedIn, getTour)
viewRouter.get("/login", isLoggedIn, getLoginForm)
viewRouter.get("/me", protectRoute, getAccount)

module.exports = viewRouter