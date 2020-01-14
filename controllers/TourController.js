const fs = require("fs")

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getAlltours = (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    })
}

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId}, req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        if (err) res.status(400).send(err)
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    })
 }

exports.getTour = (req, res) => {
    const id = Number(req.params.id)
    const tour = tours.find(tour => tour.id == id)
        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })
}


exports.updateTour = (req, res) => {

}

exports.deleteTour = (req, res) => {

}
