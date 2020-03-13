const express = require("express")
const tourRouter = express.Router()
const { createReview, getReview } = require("../controllers/ReviewController")
const { checkTourId } = require("../middlewares/checkTourId")
const { getTopTours } = require("../middlewares/aliasTopTours")
const { protectRoute } = require("../middlewares/protectRoute")
const { adminOrLeadGuideRoute, leadGuideRoute, guideRoute, userRoute } = require("../middlewares/restrictRoute")
const { getAlltours, createTour, getTour, updateTour, deleteTour, getTourStats, getMonthly, archiveTour, getArchives, unarchiveTour, getTourWithin, getDistances } = require("../controllers/TourController")

tourRouter.get("/", getAlltours)

tourRouter.get("/archives", protectRoute, getArchives)

tourRouter.get("/top", getTopTours, getAlltours)

tourRouter.get("/tour-stats", getTourStats)

tourRouter.get("/monthly-plan/:year", adminOrLeadGuideRoute, getMonthly)

tourRouter.post("/", protectRoute, adminOrLeadGuideRoute, createTour)

tourRouter.get("/:tourId", checkTourId, getTour)

tourRouter.patch("/:tourId", protectRoute, adminOrLeadGuideRoute, checkTourId, updateTour)

tourRouter.delete("/:tourId", checkTourId, adminOrLeadGuideRoute, deleteTour)

tourRouter.delete("/archives/:tourId", checkTourId, adminOrLeadGuideRoute, archiveTour)

tourRouter.delete("/unarchive/:tourId", checkTourId, adminOrLeadGuideRoute, unarchiveTour)

tourRouter.post("/:tourId/reviews", protectRoute, userRoute, checkTourId,  createReview)

tourRouter.get("/tours-within/:distance/center/:latlng/unit/:unit", getTourWithin)

tourRouter.get("/distances/:latlng/unit/:unit", getDistances)

// TODO
// tourRouter.get("/:tourId/reviews", protectRoute, checkTourId, getReview)


module.exports = tourRouter
