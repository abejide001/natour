const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

exports.jwtSign = (user) => {
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
       expiresIn: process.env.JWT_EXPIRES_IN
   })
   return token
}