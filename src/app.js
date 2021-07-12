const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')

const app = express()

app.use(express.json()) // Automatically parses incoming object to a json so we can access it in our request handler
app.use(userRouter)

// Comment out this line below to run the node and vue apps separately
app.use(express.static(__dirname + '/../build'));

module.exports = app
