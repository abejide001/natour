const User = require("../models/User")
const { sendFailureResponse, sendSuccessResponse } = require("../utils/appResponse")

exports.signUp = async(req, res) => {
    try {
     await User.create(req.body)
     sendSuccessResponse(res, 201, {
         data: {
             name: req.body.name,
             email: req.body.email
         }
     })
    } catch (error) {
       sendFailureResponse(res, 400, error.message)
    }
}