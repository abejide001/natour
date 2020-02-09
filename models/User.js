const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Please enter a name"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Please enter an email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String
    },
    photo: {
        type: String
    },
    active: {
        type: Boolean
    }
})

// hash password
userSchema.pre("save", async function(next) {
    // check if the password is not modified
    if (!this.isModified("password")) return next()
    
    // salt the password
    const salt = await bcrypt.genSalt(10, "a")

    // hash the password
    this.password = await bcrypt.hash(this.password, salt)

    // delete password confirm field
    this.passwordConfirm = undefined
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
