const usersRoutes = require('./users_routes')

module.exports = function(app, db) {
  usersRoutes(app, db)
}
