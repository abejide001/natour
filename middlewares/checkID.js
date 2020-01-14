const fs = require("fs")

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))
exports.checkID = (req, res, next) => {
    const id = Number(req.params.id)
    const tour = tours.find(tour => tour.id == id)
    if (!tour) {
        res.status(404).json({
            status: "fail",
            message: "tour does not exist"
        })
        return
    }
    next()
}