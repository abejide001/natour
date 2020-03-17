const express = require("express")
const tourRouter = express.Router()
const { createReview, getReview } = require("../controllers/ReviewController")
const { checkTourId } = require("../middlewares/checkTourId")
const { getTopTours } = require("../middlewares/aliasTopTours")
const { protectRoute } = require("../middlewares/protectRoute")
const { adminRoute, leadGuideRoute, guideRoute, userRoute } = require("../middlewares/restrictRoute")
const checkDuplicateReview = require("../middlewares/checkDuplicateReview")
const { getAlltours, createTour, getTour, updateTour, deleteTour, getTourStats, getMonthly, archiveTour, getArchives, unarchiveTour, getTourWithin, getDistances } = require("../controllers/TourController")

tourRouter.get("/", getAlltours)

tourRouter.get("/archives", protectRoute, getArchives)

tourRouter.get("/top", getTopTours, getAlltours)

tourRouter.get("/tour-stats", getTourStats)

tourRouter.get("/monthly-plan/:year", (adminRoute || leadGuideRoute), getMonthly)

tourRouter.post("/", protectRoute, (adminRoute || leadGuideRoute), createTour)

tourRouter.get("/:tourId", checkTourId, getTour)

tourRouter.patch("/:tourId", protectRoute, adminRoute, checkTourId, updateTour)

tourRouter.delete("/:tourId", checkTourId, adminRoute, deleteTour)

tourRouter.delete("/archives/:tourId", checkTourId, adminRoute, archiveTour)

tourRouter.delete("/unarchive/:tourId", checkTourId, adminRoute, unarchiveTour)

tourRouter.post("/:tourId/reviews", protectRoute, userRoute, checkTourId, checkDuplicateReview, createReview)

tourRouter.get("/tours-within/:distance/center/:latlng/unit/:unit", getTourWithin)

tourRouter.get("/distances/:latlng/unit/:unit", getDistances)

tourRouter.get("/:tourId/reviews", protectRoute, checkTourId, getReview)


module.exports = tourRouter
