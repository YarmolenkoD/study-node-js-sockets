const {SHA256} = require('crypto-js')
const {User} = require('../models/user')

module.exports = function (app, mongoose) {
  app.get('/user/:id', (req, res) => {
    const id = req.params.id

    User.findById(id).then((user) => {
      if (!user) {
        return res.status(404).send()
      }
      res.send({user: user})
    }).catch((e) => {
      res.status(400).send(e)
    })
  })

  app.get('/users', (req, res) => {
    User.find().then((users) => {
      if (!users) {
        return res.status(404).send()
      }
      res.send({users})
    }).catch((e) => {
      res.status(400).send(e)
    })
  })

  app.post('/user', (req, res) => {
    let hashPassword = SHA256(req.body.password).toString()
    let newUser = new User({
      name: req.body.name,
      password: hashPassword,
      email: req.body.email
    })
    newUser.save().then(() => {
      return newUser.generateAuthToken()
    }).then((token) => {
      res.header('x-auth', token).send(newUser)
    }).catch((e) => {
      res.status(400).send(e)
    })
  })
}
