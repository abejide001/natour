const Tour = require("../models/Tour")

exports.getAlltours = async (req, res) => {
    try {
        const queryObj = { ...req.query }

        // exclude fields 
        const excludedFields = ['page', 'sort', 'limit', 'fields']

        // delete excluded fields
        excludedFields.forEach(el => delete queryObj[el])

        // stringify onject so we can use the string method
        let queryStr = JSON.stringify(queryObj)

        // append $ to gte, gt, lte, and lt so we can query
        let query = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        console.log(query)
        // find with the query
        query = Tour.find(JSON.parse(queryStr))
        if (req.query.sort) {
            // sort with multiple params
            const sortBy = req.query.sort.split(',').join(" ")
            query = query.sort(sortBy)
        } else {
            // sort by time
            query = query.sort("-createdAt")
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ")
            query = query.select(fields)
        } else {
            query = query.select("-__v")
        }

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 100
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)

        if (req.query.page) {
            const numberOfTours = await Tour.countDocuments()
            if (skip >= numberOfTours) throw new Error("The page does not exist")
        }
        let tours = await query
        res.status(200).json({
            status: "success",
            data: {
                tours
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
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
            message: err
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
            message: err
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
            message: err
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
            message: err
        })
    }
}