const { sendFailureResponse } = require("../utils/appResponse")

exports.passwordMatch = (req, res, next) => {
    const { password, passwordConfirm } = req.body
    if (password !== passwordConfirm) {
       sendFailureResponse(res, 400, "Alaye mi password no match") 
       return
    }
    next()
}