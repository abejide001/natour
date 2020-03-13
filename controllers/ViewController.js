const Tour = require("../models/Tour")

exports.getOverview = async (req, res) => {
    const tours = await Tour.find()

    res.render("overview", {
        title: "All tours",
        tours
    })
}

exports.getTour = (req, res) => {
    res.render("Get tour")
}