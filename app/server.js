const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes/index')
const { mongoose } = require('./db/mongoose')

const app = express()
const port = process.env.PORT || process.env.port || 8000

app.use(bodyParser.json())

routes(app, mongoose)

app.listen(port, () => {
  console.log(`Started up at port ${port}`)
})

module.exports = {app}