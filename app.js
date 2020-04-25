const express = require("express")
const morgan = require("morgan")
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const path = require("path")
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require("./swagger.json")
const hpp = require("hpp")
const cookieParser = require("cookie-parser")
const app = express()

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

const tourRouter = require("./routes/tourRoute")
const authRouter = require("./routes/authRoute")
const userRouter = require("./routes/userRoute")
const reviewRouter = require("./routes/reviewRoute")
const viewRouter = require("./routes/viewRoute")
const bookingRouter = require("./routes/bookingRoute")

const { errorMiddleware } = require("./middlewares/errorMiddleware")

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many request"
})

// set security HTTP headers
app.use(helmet())

// rate limiter
app.use("/api", limiter)

// serve static files
app.use(express.static(`${__dirname}/public`))

// sanitize input against NoSQL query injection
app.use(mongoSanitize())

// data sanitization
app.use(xss())

app.use(express.json( { limit: '10kb' }))
app.use(cookieParser())

app.use(hpp({
    whitelist: [
        "duration",
        "ratingsQuantity",
        "ratingsAverage",
        "price",
        "difficulty",
        "maxGroupSize"
    ]
}))

app.use(morgan("dev"))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/bookings", bookingRouter)
app.use("/", viewRouter)

app.all("*", (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl}`)
    console.log(err.stack)
    err.status = "fail"
    err.statusCode = 404
    next(err)
}, errorMiddleware)
module.exports = app
