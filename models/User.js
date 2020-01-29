const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
