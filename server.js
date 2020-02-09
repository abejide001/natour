const app = require("./app")

require("./db/connection")()

const port = 3000

process.on("unhandledRejection", err => {
    console.log(err.name, err.message)
    process.exit(1) // shut down the app
})

app.listen(port, () => {
    console.log(`app listening on ${port}`)
})
