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

    const resetURL = `${req.protocol}://${req.get("host")}/resetPassword/${resetToken}`

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to ${resetURL}. \n
    `
    try {
        await sendMail({
            email: user.email,
            subject: "Your password reset token(valid for 10 min)",
            message
        })
        sendSuccessResponse(res, 200, "Token sent to mail")  
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}