const express = require("express");
const reviewRouter = express.Router(); // allow child to use parent params(id)

const {
  getAllReviews,
  deleteReview,
  updateReview,
} = require("../controllers/ReviewController");
const { protectRoute } = require("../middlewares/protectRoute");
const { userRoute, adminRoute } = require("../middlewares/restrictRoute");

const { checkTourId } = require("../middlewares/checkTourId");

reviewRouter.get("/", protectRoute, getAllReviews);
reviewRouter.delete(
  "/:reviewId",
  protectRoute,
  userRoute || adminRoute,
  checkTourId,
  deleteReview
);
reviewRouter.patch(
  ":/reviewId",
  protectRoute,
  userRoute,
  checkTourId,
  updateReview
);

module.exports = reviewRouter;
