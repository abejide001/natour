const mongoose = require("mongoose")
const slugify = require("slugify")

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    slug: {
        type: String
    },
    rating: {
        type: Number
    },
    duration: {
        type: String,
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
    },
    secretTour: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

tourSchema.virtual("durationWeeks").get(function() { // get virtual property! 
    return Math.ceil(this.duration / 7)
})

// query middleware
tourSchema.pre(/^find/, function(next) { // find prehook
    this.find({ secretTour: { $ne: true }})
    next()
})

// Document middleware, runs before save and create middleware
tourSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

// 
const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
