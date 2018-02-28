const mongoose = require('mongoose')
const validator = require('validator')

let UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  friends: [{
    id: {
      type: String,
      required: true
    },
    message: [{
      text: {
        type: String,
        required: true
      },
      id: {
        type: Number,
        required: true
      },

    }]
  }]
})

let User = mongoose.model('User', UserSchema)

module.exports = {User: User}
