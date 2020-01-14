const express = require("express")
const morgan = require("morgan")
const app = express()
const tourRouter = require("./routes/tourRoute")
const userRouter = express.Router()

app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)

module.exports = app