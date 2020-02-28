const { sendFailureResponse, sendSuccessResponse } = require("../../utils/appResponse")

exports.getOne = Model => {
   return async (req, res) => {
        try {
            const doc = await Model.findById(req.params.tourId).populate("reviews")
            sendSuccessResponse(res, 200, doc)
        } catch (err) {
            sendFailureResponse(res, 500, err.message)
        }
    }
}