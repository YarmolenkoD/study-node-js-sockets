const {User} = require('../models/user')
const {ObjectID} = require('mongodb')

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
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email
    })
    newUser.save().then((user) => {
      res.send(user)
    }, (e) => {
      res.status(400).send(e)
    })
  })

  app.put('/user/friend', (req, res) => {
    let newFriend = {
      id: ObjectID(req.body.friendId),
      message: []
    }
    User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.userId), {'$push': {'friends': newFriend}}, {new: true})
      .then((user) => {
        if (!user) {
          return res.status(404).send()
        }
        console.log(user)
        res.send({user})
      })
      .catch((e) => {
        res.status(400).send(e)
      })
  })
}
