const dotenv = require("dotenv")
dotenv.config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const Tour = require("../models/Tour")
const User = require("../models/User")
const Booking = require("../models/Booking")
const { sendFailureResponse, sendSuccessResponse } = require("../utils/appResponse")

exports.getCheckoutSession = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.tourId)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            // success_url: `${req.protocol}://${req.get("host")}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
            success_url: `${req.protocol}://${req.get("host")}/my-tours`,
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

// exports.createBookingCheckout = async (req, res, next) => {
//     const { tour, user, price } = req.query
//     if (!tour && !user && !price) return next()
//     await Booking.create({
//         tour,
//         user,
//         price
//     })

//     res.redirect(req.originalUrl.split("?")[0])
// }

exports.getAllBookings = (req, res) => {
    const booking = Booking.find()
    sendSuccessResponse(res, 200, booking)
}

const createBookingCheckout = async session => {
    const tour = session.client_reference_id
    const user = (await User.findOne({ email: session.customer_email })).id
    const price = session.display_items[0].amount / 100
    await Booking.create({
        tour,
        user,
        price
    })
}

exports.webhookCheckout = (req, res) => {
    const signature = req.headers["stripe-signature"]
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        sendFailureResponse(res, 400, `Webhook error: ${error.message}`)
    }
    if (event.type === "checkout.session.completed") {
        createBookingCheckout(event.data.object)
    }
    sendSuccessResponse(res, 200, {
        received: true
    })
}