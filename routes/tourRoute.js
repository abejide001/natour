const express = require("express")
const tourRouter = express.Router()
const { createReview, getReview } = require("../controllers/ReviewController")
const { checkTourId } = require("../middlewares/checkTourId")
const { getTopTours } = require("../middlewares/aliasTopTours")
const { protectRoute } = require("../middlewares/protectRoute")
const { adminRoute, leadGuideRoute, guideRoute, userRoute } = require("../middlewares/restrictRoute")
const { getAlltours, createTour, getTour, updateTour, deleteTour, getTourStats, getMonthly, archiveTour, getArchives, unarchiveTour, getTourWithin } = require("../controllers/TourController")

tourRouter.get("/", getAlltours)

tourRouter.get("/archives", protectRoute, getArchives)

tourRouter.get("/top", getTopTours, getAlltours)

tourRouter.get("/tour-stats", getTourStats)

tourRouter.get("/monthly-plan/:year", [adminRoute, leadGuideRoute, guideRoute], getMonthly)

tourRouter.post("/", protectRoute, [adminRoute, leadGuideRoute], createTour)

tourRouter.get("/:tourId", checkTourId, getTour)

tourRouter.patch("/:tourId", protectRoute, adminRoute, leadGuideRoute, checkTourId, updateTour)

tourRouter.delete("/:tourId", checkTourId, [adminRoute, leadGuideRoute], deleteTour)

tourRouter.delete("/archives/:tourId", checkTourId, [adminRoute, leadGuideRoute], archiveTour)

tourRouter.delete("/unarchive/:tourId", checkTourId, [adminRoute, leadGuideRoute], unarchiveTour)

tourRouter.post("/:tourId/reviews", protectRoute, userRoute, checkTourId,  createReview)

tourRouter.get("/tours-within/:distance/center/:latlng/unit/:unit", getTourWithin)

// TODO
// tourRouter.get("/:tourId/reviews", protectRoute, checkTourId, getReview)


module.exports = tourRouter
