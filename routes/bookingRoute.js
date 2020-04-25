const express = require("express")
const { protectRoute } = require("../middlewares/protectRoute")
const { adminRoute } = require("../middlewares/restrictRoute")
const { getCheckoutSession, getAllBookings } = require("../controllers/BookingController")
const bookingRouter = express.Router()

bookingRouter.get("/checkout-session/:tourId", protectRoute, getCheckoutSession)
bookingRouter.get("/", adminRoute, getAllBookings)

module.exports = bookingRouter