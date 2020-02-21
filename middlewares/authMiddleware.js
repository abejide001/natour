const bcrypt = require("bcrypt")

const { sendFailureResponse } = require("../utils/appResponse")
const User = require("../models/User")

exports.passwordMatch = (req, res, next) => {
    const { password, passwordConfirm } = req.body
    if (password !== passwordConfirm) {
       sendFailureResponse(res, 400, "Alaye mi password no match") 
       return
    }
    next()
}

exports.checkEmail = async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) return sendFailureResponse(res, 400, "Bad Credentials")
    next()
}

exports.checkEmailForForgotPassword = async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) return sendFailureResponse(res, 404, "User does not exist")

    next()
}

exports.verifyPassword = async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    const pass = bcrypt.compareSync(password, user.password)
    if (!pass) return sendFailureResponse(res, 400, "Bad Credentials")

    next()
}

exports.confirmPasswordForUpdate = async(req, res, next) => {
    const { password, newPassword, passwordConfirm } = req.body
    const user = await User.findById(req.user.id).select("+password")

    const pass = bcrypt.compareSync(password, user.password)
    if (!pass) return sendFailureResponse(res, 400, "Password is Invalid")

    user.password = newPassword
    user.passwordConfirm = passwordConfirm

    await user.save()
    next()
}