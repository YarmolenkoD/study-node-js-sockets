const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const bodyParser = require('body-parser')

const routes = require('./routes/index')
const sockets = require('./sockets/index')
const { mongoose } = require('./db/mongoose')

const app = express()
app.use(bodyParser.json())
const server = http.Server(app)
const websocket = socketio(server)
const port = process.env.PORT || process.env.port || 8000


routes(app, mongoose)

server.listen(port, () => {
  console.log(`Started up at port ${port}`)
})

sockets(websocket)

module.exports = {app}