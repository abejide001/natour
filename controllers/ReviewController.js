const Review = require("../models/Review")
const { sendSuccessResponse, sendFailureResponse } = require("../utils/appResponse")

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate("user", ["name", "email"])
        sendSuccessResponse(res, 200, reviews)
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}

exports.createReview = async (req, res) => {
    try {
        const review = await Review.create({
            review: req.body.review,
            user: req.user.id,
            tour: req.params.tourId
        })
        sendSuccessResponse(res, 201, review)
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}

exports.deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.reviewId)
        sendSuccessResponse(res, 204, "Deleted Successfully")
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}