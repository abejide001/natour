const express = require("express")
const reviewRouter = express.Router() // allow child to use parent params(id)

const { getAllReviews, deleteReview, updateReview } = require("../controllers/ReviewController")
const { protectRoute } = require("../middlewares/protectRoute")
const { userRoute, adminOrLeadGuideRoute } = require("../middlewares/restrictRoute")

const { checkTourId } = require("../middlewares/checkTourId")

reviewRouter.get("/", protectRoute, getAllReviews)
reviewRouter.delete("/:reviewId", protectRoute, [userRoute, adminOrLeadGuideRoute], checkTourId, deleteReview)
reviewRouter.patch(":/reviewId", protectRoute, [userRoute, adminOrLeadGuideRoute], checkTourId, updateReview)

module.exports = reviewRouter