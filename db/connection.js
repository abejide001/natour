const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env
const connectDB = () => {
    mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    })
        .then(() => console.log(`connected successfully`))
        .catch((err) => console.log(err))
}

module.exports = connectDB