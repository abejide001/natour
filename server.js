const app = require("./app")

require("./db/connection")()

const port = 3000
app.listen(port, () => {
    console.log(`app listening on ${port}`)
})