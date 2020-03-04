const mongoose = require("mongoose")
const Tour = require("./Tour")

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: "Tour",
        required: true
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

// static method
reviewSchema.statics.calcAverageRatings = async function(tourId) {
    const stats = await this.aggregate([
        {
            $match: { tour: tourId }
        }, {
            $group: {
                _id: "$tour",
                nRating: { $sum: 1 },
                avgRating: { $avg: "$rating" }
            }
        }
    ])
    if (stats.length > 0) {
        await Tour.findByIdAndUpdate(tourId, { // updated the tour ratings and average
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        })
    } else {
        await Tour.findByIdAndUpdate(tourId, { // updated the tour ratings and average
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        })
    }
}

// post query middleware
reviewSchema.post("save", function() { // the post middleware does not get access to next
    this.constructor.calcAverageRatings(this.tour) 
})

// pre query middleware
reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.find() // pass this data into the post middleware
    next()
})

// post query middleware
reviewSchema.post(/^findOneAnd/, async function(next) {
    await this.r.constructor.calcAverageRatings(this.r.tour)
    next()
})

// prevent duplicate review from a user
reviewSchema.index({
    tour: 1,
    user: 1
}, {
    unique: true
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review