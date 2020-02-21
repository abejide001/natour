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

tourRouter.get("/:id", checkTourId, getTour)

tourRouter.patch("/:id", protectRoute, restrictRoute, checkTourId, updateTour)

tourRouter.delete("/:id", protectRoute, restrictRoute, checkTourId, deleteTour)

tourRouter.delete("/archives/:id", checkTourId, archiveTour)

tourRouter.delete("/unarchive/:id", checkTourId, unarchiveTour)

module.exports = tourRouter
