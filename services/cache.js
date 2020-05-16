const dotenv = require("dotenv")
const redis = require('redis')

dotenv.config()
const port = 6379 || process.env.PORT

let client

if (process.env.NODE_ENV === "production") {
    client = redis.createClient({
        port,
        host: "prodprod.redis.cache.windows.net",
        password: process.env.REDIS_PASSWORD
    })
    client.on("error", err => {
        console.log(err)
    })
    client.on('connect', function() {
        console.log('production redis connected');
    });
} else {
    client = redis.createClient(port)
    client.on("error", err => {
        console.log(err)
    })
    client.on('connect', function() {
        console.log('development redis connected');
    });
}

module.exports = client