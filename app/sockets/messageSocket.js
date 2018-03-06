const {Message} = require('../models/message')

module.exports = function (socket) {
  // The event will be called when a client is connected.
  socket.on('connection', (socket) => {
    console.log('A client just joined on', socket.id)
  })

  socket.on('message', (message) => {
    console.log(11111, message)
    // Save the message document in the `messages` collection.
    // db.collection('messages').insert(message)
    let newMessage = new Message({
      text: message.text,
      user: message.user,
      createAt: message.createAt
    })
    newMessage.save()
    // The `broadcast` allows us to send to all users but the sender.
    socket.broadcast.emit('message', message)
  })
}
