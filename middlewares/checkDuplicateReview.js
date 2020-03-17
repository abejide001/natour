const Review = require("../models/Review")
const { sendFailureResponse } = require("../utils/appResponse")

const checkDuplicateReview = async (req, res, next) => {
  const tour = req.params.tourId
  const review = await Review.findOne({ tour, user: req.user.id }) 
  if (review) return sendFailureResponse(res, 400, "review exist")

  next()
}

module.exports = checkDuplicateReview