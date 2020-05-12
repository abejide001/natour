const express = require("express")
const viewRouter = express.Router()
const { getOverview, getTour, getLoginForm, getAccount, getMyTours, getSignupForm } = require("../controllers/ViewController")
const { protectRoute } = require("../middlewares/protectRoute")
// const { createBookingCheckout } = require("../controllers/BookingController")
const isLoggedIn = require("../middlewares/isLoggedIn")
const redirectToLogin = require("../middlewares/redirectToLogin")
// const redirectToHome = require("../middlewares/redirectToHome")

viewRouter.get("/", isLoggedIn, getOverview)
viewRouter.get("/tour/:slug", isLoggedIn, getTour)
viewRouter.get("/login", isLoggedIn, getLoginForm)
viewRouter.get("/signup", isLoggedIn, getSignupForm)
viewRouter.get("/me", redirectToLogin, protectRoute, getAccount)
viewRouter.get("/my-tours", redirectToLogin, protectRoute, getMyTours)

module.exports = viewRouter