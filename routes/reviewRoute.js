const express = require("express")
const reviewRouter = express.Router()

const { getAllReviews, createReview, deleteReview } = require("../controllers/ReviewController")
const { protectRoute } = require("../middlewares/protectRoute")
const { checkTourId } = require("../middlewares/checkTourId")

reviewRouter.get("/", protectRoute, getAllReviews)
reviewRouter.post("/tour/:tourId", protectRoute, checkTourId, createReview)
reviewRouter.delete("/:reviewId", protectRoute, deleteReview)

module.exports = reviewRouter