const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.json())
const port = 3000
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const getAlltours = (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    })
}

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId}, req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        if (err) res.status(400).send(err)
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    })
 }

const getTour = (req, res) => {
    const id = Number(req.params.id)
    const tour = tours.find(tour => tour.id == id)
    if (tour) {
        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })
        return
    }
    res.status(404).json({
        status: "fail",
        message: "tour does not exist"
    })

}

const updateTour = (req, res) => {

}

const deleteTour = (req, res) => {

}

app.get("/api/v1/tours", getAlltours)

app.post("/api/v1/tours", createTour)

app.get("/api/v1/tours/:id", getTour)

app.patch("/api/v1/tours/:id", updateTour)

app.delete("/api/v1/tours/:id", deleteTour)

app.listen(port, () => {
    console.log(`app listening on ${port}`)
})