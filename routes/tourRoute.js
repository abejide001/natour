const express = require("express")
const tourRouter = express.Router()
const { checkTourId } = require("../middlewares/checkTourId")
const { getTopTours } = require("../middlewares/aliasTopTours")
const { protectRoute } = require("../middlewares/protectRoute")
const { restrictRoute } = require("../middlewares/restrictRoute")
const { getAlltours, createTour, getTour, updateTour, deleteTour, getTourStats, getMonthly, archiveTour, getArchives, unarchiveTour } = require("../controllers/TourController")

tourRouter.get("/", protectRoute, getAlltours)

tourRouter.get("/archives", protectRoute, getArchives)

tourRouter.get("/top", getTopTours, getAlltours)

tourRouter.get("/tour-stats", getTourStats)

tourRouter.get("/monthly-plan/:year", getMonthly)

tourRouter.post("/", createTour)

tourRouter.get("/:tourId", checkTourId, getTour)

tourRouter.patch("/:tourId", protectRoute, restrictRoute, checkTourId, updateTour)

tourRouter.delete("/:tourId", checkTourId, deleteTour)

tourRouter.delete("/archives/:tourId", checkTourId, archiveTour)

tourRouter.delete("/unarchive/:tourId", checkTourId, unarchiveTour)

module.exports = tourRouter
