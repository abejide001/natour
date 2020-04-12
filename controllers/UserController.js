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

// TODO: CREATE USER
exports.createUser = (req, res) => {

}

exports.updateMe = async(req, res) => {
    const filteredBody = filterBody(req.body, "name", "email")
    console.log(req.user.id)
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { // x because we don't want the user to change other fields apart from email and name
        new: true,
        runValidators: true
    })
    console.log("thissss")
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

// TODO: UPDATE USER
// exports.updateUser = (req, res) => {

// }

// TODO: DELETE USER
exports.deleteUser = (req, res) => {

}

exports.getMe = (req, res) => {
    sendSuccessResponse(res, 200, req.user)
}