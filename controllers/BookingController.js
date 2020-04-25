const dotenv = require("dotenv")
dotenv.config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const Tour = require("../models/Tour")
const Booking = require("../models/Booking")
const { sendFailureResponse, sendSuccessResponse } = require("../utils/appResponse")

exports.getCheckoutSession = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.tourId)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            success_url: `${req.protocol}://${req.get("host")}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
            cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
            customer_email: req.user.email,
            client_reference_id: req.params.tourId,
            line_items: [
                {
                    name: `${tour.name} Tour`,
                    description: tour.summary,
                    images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
                    amount: tour.price * 100,
                    currency: "usd",
                    quantity: 1
                }
            ]
        })
        sendSuccessResponse(res, 200, session)
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}

exports.createBookingCheckout = async (req, res, next) => {
    const { tour, user, price } = req.query
    if (!tour && !user && !price) return next()
    await Booking.create({
        tour,
        user,
        price
    })

    res.redirect(req.originalUrl.split("?")[0])
}

exports.getAllBookings = (req, res) => {
    const booking = Booking.find()
    sendSuccessResponse(res, 200, booking)
}