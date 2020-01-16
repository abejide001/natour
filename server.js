const app = require("./app")

const connectDB = require("./db/connection")

const port = 3000
app.listen(port, () => {
    console.log(`app listening on ${port}`)
})
connectDB()