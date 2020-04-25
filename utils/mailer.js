const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
const pug = require("pug")
const htmlToText = require("html-to-text")

dotenv.config()

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email
        this.firstName = user.name.split(" ")[0];
        this.url = url
        this.from = "Papa <kaka@gmail.com>"
    }

    newTransport() {
        const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD, SENDGRID_USERNAME, SENDGRID_PASSWORD } = process.env
        if (process.env.NODE_ENV === "production") {
            return nodemailer.createTransport({
                service: "SendGrid",
                auth: {
                    user: SENDGRID_USERNAME,
                    pass: SENDGRID_PASSWORD
                }
            })
        }
        return nodemailer.createTransport({
            secureConnection: false,
            host: EMAIL_HOST,
            port: EMAIL_PORT,
            auth: {
                user: EMAIL_USERNAME,
                pass: EMAIL_PASSWORD
            },
        })

    }

    async send(template, subject) {
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        })
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html),
        }
        await this.newTransport().sendMail(mailOptions)
    }

    async sendWelcome() {
        await this.send("welcome", "Welcome to the Natours family")
    }

    async sendPasswordReset() {
        await this.send("passwordReset", "Your password reset token")
    }
}
