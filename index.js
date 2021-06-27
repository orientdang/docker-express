const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const redis = require("redis")
const {
    MONGO_IP,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASSWORD,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET,
} = require("./config/config.js")
const cors = require("cors")

const app = express()
app.enable("trust proxy")
const port = process.env.PORT || 3000

let RedisStore = require("connect-redis")(session)
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
})

const postRouter = require("./routes/postRoute")
const userRouter = require("./routes/userRoute")

// connect to mongo
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const MONGO_OPTION = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
}

const connectWithRetries = () => {
    mongoose
        .connect(MONGO_URL, MONGO_OPTION)
        .then(() => console.log("Connect to DB successfull"))
        .catch((e) => {
            console.log(e)
            setTimeout(() => {
                connectWithRetries()
            }, 5000)
        })
}
connectWithRetries()

// MIDDLEWARE
app.use(cors({}))
app.use(express.json())
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httpOnly: true,
            maxAge: 60000,
        },
    })
)

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)
// serve requets
app.get("/api/v1/healthcheck", (req, res) => {
    res.send("Hi 3")
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})
