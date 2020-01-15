const express = require("express")
const tourRouter = express.Router()
const { getAlltours, createTour, getTour, updateTour, deleteTour } = require("../controllers/TourController")
const { checkID } = require("../middlewares/checkID")

tourRouter.get("/", getAlltours)

tourRouter.post("/", createTour)

tourRouter.get("/:id", checkID, getTour)

tourRouter.patch("/:id", updateTour)

tourRouter.delete("/:id", deleteTour)

module.exports = tourRouter