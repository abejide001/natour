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

exports.getTourStats = async (req, res) => {
    try {

    } catch (err) {

    }
}
