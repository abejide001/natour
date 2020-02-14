const nodemailer = require("nodemailer")
const dotenv = require("dotenv")

dotenv.config()

const sendEmail = async options => {
    const { EMAIL_USERNAME, EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT } = process.env
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD
        }
    })
    const mailOptions = {
        from: "Papa <kaka@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail