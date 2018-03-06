const usersRoutes = require('./users_routes')
const messageRoutes = require('./message_routes')

module.exports = function(app, db) {
  usersRoutes(app, db)
  messageRoutes(app, db)
}
