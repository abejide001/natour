const express = require("express")
const fs = require("fs")
const tourRouter = express.Router()
const { getAlltours, createTour, getTour, updateTour, deleteTour } = require("../controller/TourController")

tourRouter.get("/", getAlltours)

tourRouter.post("/", createTour)

tourRouter.get("/:id", getTour)

tourRouter.patch("/:id", updateTour)

tourRouter.delete("/:id", deleteTour)

module.exports = tourRouter