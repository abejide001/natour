const mongoose = require("mongoose")

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    rating: {
        type: Number
    },
    duration: {
        type: Number,
        required: true
    },
    maxGroupSize: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    priceDiscount: {
        type: Number
    },
    summary: {
       type: String,
       required: true
    },
    description: {
        type: String,
        required: true
    },
    imageCover: {
        type: String,
        required: true
    },
    images: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: {
        type: [Date]
    }
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
