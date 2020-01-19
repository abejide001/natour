const mongoose = require("mongoose")

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour