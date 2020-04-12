const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const User = require("../models/User")
const { sendFailureResponse } = require("../utils/appResponse")

const isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const token = req.cookies.jwt
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const { id, iat } = decoded

            // check if user still exist
            const currentUser = await User.findById(id).select(["-password", "-passwordResetExpires", "-passwordResetToken", "-passwordChangedAt"])
            if (!currentUser) return sendFailureResponse(res, 401, "User does not exist")
            if (currentUser.changedPasswordAfter(iat)) return sendFailureResponse(res, 401, "Password changed, log in again")
            res.locals.user = currentUser // popluate req.user with logged in user info
        } catch (error) {
            return next()
        }
    }
    next()
}

module.exports = isLoggedIn