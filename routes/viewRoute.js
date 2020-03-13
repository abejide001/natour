const express = require("express")
const viewRouter = express.Router()
const { getOverview, getTour } = require("../controllers/ViewController")

viewRouter.get("/", getOverview)
viewRouter.get("/tour", getTour)

module.exports = viewRouter