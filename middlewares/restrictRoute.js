const { sendFailureResponse } = require("../utils/appResponse")

exports.restrictRoute = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) return sendFailureResponse(res, 403, "You do not permission to access this route")
        next()
    }
}