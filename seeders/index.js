const Tour = require("../models/Tour")
const User = require("../models/User")
const tourData = require("../dev-data/data/tours-simple.json")
const userData = require("../dev-data/data/users.json")

require("../db/connection")()
const seedData = async () => {
    try {
        await Promise.all([Tour.insertMany(tourData), User.insertMany(userData)])
        console.log("data seeded")
    } catch(err) {
        console.log(err.message)
    }
}
seedData()
