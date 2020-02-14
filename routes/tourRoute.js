const express = require("express")
const tourRouter = express.Router()
const { checkId } = require("../middlewares/checkId")
const { getTopTours } = require("../middlewares/aliasTopTours")
const { protectRoute } = require("../middlewares/protectRoute")
const { restrictRoute } = require("../middlewares/restrictRoute")
const { getAlltours, createTour, getTour, updateTour, deleteTour, getTourStats, getMonthly } = require("../controllers/TourController")

tourRouter.get("/", protectRoute, getAlltours)

tourRouter.get("/top", getTopTours, getAlltours)

tourRouter.get("/tour-stats", getTourStats)

tourRouter.get("/monthly-plan/:year", getMonthly)

tourRouter.post("/", createTour)

tourRouter.get("/:id", checkId, getTour)

tourRouter.patch("/:id", protectRoute, restrictRoute, checkId, updateTour)

tourRouter.delete("/:id", protectRoute, restrictRoute, checkId, deleteTour)

module.exports = tourRouter
