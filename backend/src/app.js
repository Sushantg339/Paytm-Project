const express = require("express");
const cors = require('cors')

const mainRouter  = require("./routes/index.route");
const cookieParser = require("cookie-parser");

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}))

app.use('/api/v1', mainRouter)

module.exports = app