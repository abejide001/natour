const User = require("../models/User")
const { sendFailureResponse, sendSuccessResponse } = require("../utils/appResponse")
const { jwtSign } = require("../helpers/token")
const Email = require("../utils/mailer")

exports.signUp = async (req, res) => {
    try {
        const { name, email, password, passwordConfirm, role } = req.body
        const newUser = await User.create({
            name, email, password, passwordConfirm, role
        })
        const url = `${req.protocol}://${req.get("host")}/me`
        await new Email(newUser, url).sendWelcome()
        const userToken = jwtSign(newUser, res)
        return sendSuccessResponse(res, 201, {
            user: { name, email, userToken }
        })
    } catch (error) {
        sendFailureResponse(res, 500, error.message)
    }
}

exports.signIn = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        const token = jwtSign(user, res)
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
    try {
        await new Email(user, resetURL).sendPasswordReset()
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

exports.updatePassword = async (req, res) => {
   try {
    const user = await User.findById(req.user.id)
    const token = jwtSign(user, res)
      sendSuccessResponse(res, 200, {
          token
      }) 
   } catch (error) {
       sendFailureResponse(res, 500, error.message)
   }
}

exports.logout = (req, res) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 10),
        httpOnly: true
    })
    sendSuccessResponse(res, 200, "logged out")
}