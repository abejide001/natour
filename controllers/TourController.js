const Tour = require("../models/Tour")
const { features } = require("../utils/features")
const { sendFailureResponse, sendSuccessResponse } = require("../utils/appResponse")

exports.getAlltours = async (req, res) => {
    try {
        let tours = await features(req)
        sendSuccessResponse(res, 200, tours)
    } catch (err) {
        sendFailureResponse(res, 500, err.message)
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
        sendFailureResponse(res, 500, err.message)
    }
}

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.tourId).populate("reviews")
        sendSuccessResponse(res, 200, tour)
    } catch (err) {
        sendFailureResponse(res, 500, err.message)
    }
}

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.tourId, req.body, {
            new: true
        })
        sendSuccessResponse(res, 200, tour)
    } catch (err) {
        sendFailureResponse(res, 500, err.message)
    }
}

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.tourId)
        sendSuccessResponse(res, 204, "Deleted successfully")
    } catch (err) {
        sendFailureResponse(res, 500, err.message)
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
                    _id: "$difficulty", // group by difficulty
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
        sendFailureResponse(res, 500, err.message)
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
                $project: { _id: 0 } // remove the tourId field
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
        sendFailureResponse(res, 500, error.message)
    }
}

exports.archiveTour = async (req, res) => {
    try {
        await Tour.findByIdAndUpdate(req.params.tourId, {
            archive: true
        })
        sendSuccessResponse(res, 200, {
            message: "tour archived"
        })
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}

exports.unarchiveTour = async (req, res) => {
    try {
        await Tour.findByIdAndUpdate(req.params.tourId, {
            archive: false
        })
        sendSuccessResponse(res, 200, {
            message: "tour unarchived"
        })
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}
exports.getArchives = async (req, res) => {
    try {
        const tour = await Tour.find({
            archive: {
                $eq: true
            }
        })
        sendSuccessResponse(res, 200, {
            tour
        })
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}

exports.getTourWithin = async (req, res) => {
    const { distance, latlng, unit } = req.params
    const [lat, lng] = latlng.split(",")
    const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1
    if (!lat || !lng) sendFailureResponse(res, 400, "Please provide lat, lng")
    const tours = await Tour.find({
        startLocation: {
            $geoWithin: { $centerSphere: [[lng, lat], radius] }
        }
    })
    sendSuccessResponse(res, 200, {
        results: tours.length,
        tours
    })
}

exports.getDistances = async (req, res) => {
    const { latlng, unit } = req.params
    const [lat, lng] = latlng.split(",")
    const multiplier = unit === "mi" ? 0.00062137 : 0.001

    if (!lat || !lng) sendFailureResponse(res, 400, "Please provide lat, lng")

    const distances = await Tour.aggregate([
        {
            $geoNear: {  // always the first in geo aggregation
                near: {
                    type: "Point",
                    coordinates: [lng * 1, lat * 1]
                },
                distanceField: "distance"
            },
            distanceField: "distance",
            distanceMultiplier: multiplier // in km
        }, {
            $project: {
                distance: 1,
                name: 1
            }
        }
    ])
    sendSuccessResponse(res, 200, distances)
}