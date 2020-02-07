const express = require("express")
const morgan = require("morgan")
const app = express()
const tourRouter = require("./routes/tourRoute")
const userRouter = express.Router()
const { errorMiddleware } = require("./middlewares/errorMiddleware")

app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)

app.all("*", (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl}`)
    console.log(err.stack)
    err.status = "fail"
    err.statusCode = 404
    next(err)
}, errorMiddleware)
module.exports = app
