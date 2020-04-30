const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

exports.jwtSign = (user, req, res) => {
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
       expiresIn: process.env.JWT_EXPIRES_IN
   })
   const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https"
}
   res.cookie("jwt", token, cookieOptions)
   return token
}