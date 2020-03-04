const mongoose = require("mongoose")

const Tour = require("../models/Tour")
const { sendFailureResponse } = require("../utils/appResponse")

exports.checkTourId = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.tourId))  return sendFailureResponse(res, 404, "Tour not found")
        const tour = await Tour.findById(req.params.tourId)
        if (!tour) return sendFailureResponse(res, 404, "Tour not found")
    } catch(error) {
        return sendFailureResponse(res, 500, error.message)
    }
   next()
}
