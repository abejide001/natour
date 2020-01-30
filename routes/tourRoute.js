const express = require("express")
const tourRouter = express.Router()
const { checkId } = require("../middlewares/checkId")
const { getTopTours } = require("../middlewares/aliasTopTours")
const { getAlltours, createTour, getTour, updateTour, deleteTour, getTourStats, getMonthly } = require("../controllers/TourController")

tourRouter.get("/", getAlltours)

tourRouter.get("/top", getTopTours, getAlltours)

tourRouter.get("/tour-stats", getTourStats)

tourRouter.get("/monthly-plan/:year", getMonthly)

tourRouter.post("/", createTour)

tourRouter.get("/:id", checkId, getTour)

tourRouter.patch("/:id", checkId, updateTour)

tourRouter.delete("/:id", deleteTour)

module.exports = tourRouter
