const messageRoutes = require('./messageSocket')

module.exports = function(socket) {
  messageRoutes(socket)
}
