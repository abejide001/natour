const User = require("../models/User")
const filterBody = require("../helpers/filterBody")
const { sendFailureResponse, sendSuccessResponse } = require("../utils/appResponse")

exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.find()
        sendSuccessResponse(res, 200, {
            users
        })
    } catch(error) {
        sendFailureResponse(res, 500, error.message)
    }
}

exports.getUser = (req, res) => {

}

exports.createUser = (req, res) => {

}

exports.updateMe = async(req, res) => {
    const filteredBody = filterBody(req.body, "name", "email")
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { // x because we don't want the user to change other fields apart from email and name
        new: true,
        runValidators: true
    })
    sendSuccessResponse(res, 200, {
        user: updatedUser
    })
}

exports.deleteMe = async(req, res) => {
    await User.findByIdAndUpdate(req.user.id, {
        active: false
    })
    sendSuccessResponse(res, 204, null)
}

exports.updateUser = (req, res) => {

}

exports.deleteUser = (req, res) => {

}
