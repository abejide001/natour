const express = require("express")
const viewRouter = express.Router()
const { getOverview, getTour, getLoginForm } = require("../controllers/ViewController")

viewRouter.get("/", getOverview)
viewRouter.get("/tour/:slug", getTour)
viewRouter.get("/login", getLoginForm)

module.exports = viewRouter