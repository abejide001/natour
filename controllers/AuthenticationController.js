const User = require("../models/User")
const { sendFailureResponse, sendSuccessResponse } = require("../utils/appResponse")
const { jwtSign } = require("../helpers/token")
const sendMail = require("../utils/mailer")

exports.signUp = async (req, res) => {
    try {
        const { name, email, password, passwordConfirm } = req.body
        const newUser = await User.create({
            name, email, password, passwordConfirm
        })
        const userToken = jwtSign(newUser)
        return sendSuccessResponse(res, 201, {
            user: { name, email, userToken }
        })
    } catch (error) {
        sendFailureResponse(res, 400, error.message)
    }
}

exports.signIn = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        const token = jwtSign(user)
        sendSuccessResponse(res, 200, { token })
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    const resetURL = `${req.protocol}://${req.get("host")}/api/v1/auth/reset/${resetToken}`
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to ${resetURL}.`
    try {
        await sendMail({
            email: user.email,
            subject: "Your password reset link(valid for 10 min)",
            message
        })
        sendSuccessResponse(res, 200, {
            message: "I don send password reset link to your mail 😶"
        })
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}

exports.resetPasssword = (req, res) => {
    try {
        const { token } = req
        sendSuccessResponse(res, 200, {
            token
        })
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}