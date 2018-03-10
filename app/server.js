const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const bodyParser = require('body-parser')

const routes = require('./routes/index')
const sockets = require('./sockets/index')
const {mongoose} = require('./db/mongoose')

const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oauth20')
const facebook = require('./configuration/config')

// Transform Facebook profile because Facebook and Google profile objects look different
// and we want to transform them into user objects that have the same set of attributes
const transformFacebookProfile = (profile) => ({
  name: profile.name,
  avatar: profile.picture.data.url
})

// Register Facebook Passport strategy
passport.use(new FacebookStrategy(facebook, async (accessToken, refreshToken, profile, done) => {
    done(null, transformFacebookProfile(profile._json))
  }
))

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user))

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user))

const app = express()

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
const server = http.Server(app)
const websocket = socketio(server, {
  pingTimeout: 30000,
  pingInterval: 30000
})
const port = process.env.PORT || process.env.port || 8000


routes(app, mongoose)

// Set up Facebook auth routes
app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
  // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)))


server.listen(port, () => {
  console.log(`Started up at port ${port}`)
})

sockets(websocket)

module.exports = {app}