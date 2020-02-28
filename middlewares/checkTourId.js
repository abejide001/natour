const Tour = require("../models/Tour")
const { sendFailureResponse } = require("../utils/appResponse")

exports.checkTourId = async (req, res, next) => {
    try {
        const tour = await Tour.findById(req.params.tourId)
        if (!tour) return sendFailureResponse(res, 404, "Tour not found")
    } catch(error) {
        return sendFailureResponse(res, 500, error.message)
    }
   next()
}
