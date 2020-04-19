const Tour = require("../models/Tour")

exports.getOverview = async (req, res) => {
    const tours = await Tour.find()

    res.render("overview", {
        title: "All tours",
        tours
    })
}

exports.getTour = async (req, res) => {
    const { slug } = req.params
    const tour = await Tour.findOne({ slug }).populate({
        path: "reviews",
        populate: {
            path: "user",
            select: "email -_id name photo"
        }
    }).populate("guides")
    if (!tour) {
        return res.render("error", {
            msg: "no tour with that name"
        })
    }
    res.render("tour", {
        tour
    })
}

exports.getLoginForm =  (req, res) => {
    console.log(req.cookies, "reqqqq")
    res.status(200).render("login")
}

exports.getAccount = (req, res) => {
    res.status(200).render("account", {
        title: "Your Account"
    })
}