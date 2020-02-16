const Tour = require("../models/Tour")
const { features } = require("../utils/features")
const { sendFailureResponse, sendSuccessResponse } = require("../utils/appResponse")

exports.getAlltours = async (req, res) => {
    try {
        let tours = await features(req)
        sendSuccessResponse(res, 200, tours)
    } catch (err) {
        sendFailureResponse(res, 400, err.message)
    }
}

exports.createTour = async (req, res) => {
    try {
        const { name, price, rating } = req.body
        const newTour = await Tour.create({
            name,
            price,
            rating
        })
        sendSuccessResponse(res, 201, newTour)
    } catch (err) {
        sendFailureResponse(res, 400, err.message)
    }
}

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id)
        sendSuccessResponse(res, 200, tour)
    } catch (err) {
        sendFailureResponse(res, 400, err.message)
    }
}

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        sendSuccessResponse(res, 200, tour)
    } catch (err) {
        sendFailureResponse(res, 400, err.message)
    }
}

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        sendSuccessResponse(res, 204, "Deleted successfully")
    } catch (err) {
        sendFailureResponse(res, 400, err.message)
    }
}

exports.getTourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([ // returns an aggregate object
            {
                $match: {
                    ratingsAverage: { $gte: 4.5 } // match ratings greater than or equal to 4.5
                },
            },
            {
                $group: {
                    _id: "$difficulty",
                    numRatings: { $sum: "$ratingsQuantity" },
                    numTours: { $sum: 1 },
                    avgRating: { $avg: "$ratingsAverage" },
                    avgPrice: { $avg: "$price" },
                    minPrice: { $min: "$price" },
                    maxPrice: { $max: "$price" }
                }
            },
            {
                $sort: { avgPrice: 1 } // sort in ascending order
            },
            // {
            //     $match: { _id: { $ne: "easy" } }
            // }
        ])
        sendSuccessResponse(res, 200, stats)
    } catch (err) {
        sendFailureResponse(res, 400, err.message)
    }
}

exports.getMonthly = async (req, res) => {
    try {
        const year = Number(req.params.year)
        const plan = await Tour.aggregate([
            {
                $unwind: "$startDates" // use the startDate 
            },
            {
                $match: {
                    startDates: {
                        // match the following dates
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$startDates" },
                    numTourStats: { $sum: 1 }, // sum of the number of ntours
                    tours: { $push: "$name" } // push the name of the tour in the array
                }
            },
            {
                $addFields: { month: "$_id" } // add the month field
            },
            {
                $project: { _id: 0 } // remove the id field
            },
            {
                $sort: { numTourStats: -1 } // sort in desc order
            },
            {
                $limit: 12 // limit the field
            }
        ])
        sendSuccessResponse(res, 200, plan)
    } catch (error) {
        sendFailureResponse(res, 400, err.message)
    }
}