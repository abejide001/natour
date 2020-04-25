const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

const connectDB = () => {
    mongoose.connect(`mongodb://127.0.0.1:27017/natour`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    })
        .then(() => console.log(`database connected successfully`))
        .catch((err) => console.log(err.message))
}


module.exports = connectDB