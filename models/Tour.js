const mongoose = require("mongoose")
const slugify = require("slugify")

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        index: true,
        required: [true, 'A tour must have a name'],
        maxlength: [40, 'A tour name must have less than equal 40 characters'],
        minlength: [10, 'A tour name must have more than equal 10 characters']
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
        required: true,
        enum: {
            values: ["easy", "medium", "difficult"],
            message: "Dificulty is either: easy, medium, difficult"
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, "Rating must be above 1.0"],
        max: [5, "Rating must be below 5.0"],
        set: val => Math.round(val * 10) / 10
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
        type: Number,
        validate: {
            validator: function (val) {
                return val < this.price
            },
            message: "Price should be greater than Price discount"
        }
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
    archive: {
        type: Boolean,
        default: false,
        select: false
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
    },
    startLocation: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
    },
    locations: [
        {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point']
            },
            coordinates: [Number],
            address: String,
            description: String,
            day: Number
        }
    ],
    guides: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

tourSchema.index({ startLocation: "2dsphere" })
// virtual populate...
tourSchema.virtual("reviews", {
    ref: "Review",
    foreignField: "tour",
    localField: "_id"
})

tourSchema.virtual("durationWeeks").get(function () { // get virtual property! 
    return Math.ceil(this.duration / 7)
})

// query middleware
tourSchema.pre(/^find/, function (next) { // find prehook
    this.find({ secretTour: { $ne: true } })
    next()
})

tourSchema.pre(/^find/, function (next) { // find prehook
    this.populate()
    next()
})

// Document middleware, runs before save and create middleware
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

// post middleware
// tourSchema.post(/^find/, function(doc, next) {
//     console.log(doc)
//     next()
// })

// aggregate middleware
// tourSchema.pre("aggregate", function (next) {
//     this.pipeline().unshift({
//         $match: {
//             secretTour: { $ne: true }
//         }
//     })
//     next()
// })


const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
