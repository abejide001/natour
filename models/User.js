const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

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
    newPassword: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: String,
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    photo: {
        type: String
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

// get active users
userSchema.pre(/^find/, function(next) {
    this.find({ active: {
        $ne: false
    }})
    next()
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

userSchema.pre("save", function(next) {
    if (!this.isModified("password") || this.isNew) return next()

    this.passwordChangedAt = Date.now() - 1000

    next()
})

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
         const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
         return JWTTimestamp < changedTimeStamp // password changed if password changed ts is greater than jwt ts
    }
    return false // means the password was not changed
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex") // not encrypted(sending to user)

    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex") // reset token to user(encrypted, saving in db)

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000 // password expire time

    return resetToken
}

const User = mongoose.model('User', userSchema)

module.exports = User
