const Tour = require("../models/Tour")
const { features } = require("../api-features/features")

exports.getAlltours = async (req, res) => {
    try {
        let tours = await features(req)
        res.status(200).json({
            status: "success",
            data: {
                tours
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
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
        res.status(201).json({
            status: "success",
            data: {
                newTour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            message: "Deleted successfully"
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
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
        res.status(200).json({
            status: "success",
            data: {
                message: stats
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
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
                $limit: 12
            }
        ])
        res.status(200).json({
            status: "success",
            data: {
                message: plan
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}