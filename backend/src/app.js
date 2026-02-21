const express = require("express");
const cors = require('cors')

const mainRouter  = require("./routes/index.route");

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1', mainRouter)

module.exports = app