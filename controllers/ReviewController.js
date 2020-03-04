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

// TODO: get reviews for a single tour
// exports.getReview = async (req, res) => {
//     try {
//         const tourId = req.params.tourId
//         console.log(typeof tourId)
//         const review = await Review.findOne({ tour: "232435454"})
//         console.log(review)
//         sendSuccessResponse(res, 200, review) 
//     } catch (error) {
//         sendFailureResponse(res, 500, error.message)
//     }
// }

exports.createReview = async (req, res) => {
    try {
        const { rating, review } = req.body
        const reviews = await Review.create({
            review,
            user: req.user.id,
            tour: req.params.tourId,
            rating
        })
        sendSuccessResponse(res, 201, reviews)
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

exports.updateReview = async (req, res) => {
    try {
        await Review.findByIdAndUpdate(req.params.reviewId, req.body, {
            new: true
        })
        sendSuccessResponse(res, 200, "Review updated successfully")
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}