const express = require("express")
const tourRouter = express.Router()
const { checkId } = require("../middlewares/checkId")
const { getAlltours, createTour, getTour, updateTour, deleteTour } = require("../controllers/TourController")

tourRouter.get("/", getAlltours)

tourRouter.post("/", createTour)

tourRouter.get("/:id", checkId, getTour)

tourRouter.patch("/:id", checkId, updateTour)

tourRouter.delete("/:id", deleteTour)

module.exports = tourRouter