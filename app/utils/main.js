const {geocoder} = require('../services/geocoder')

async function getLocation (address) {
  return new Promise(resolve => {
    geocoder.geocode(address, (err, res) => {
      let location = {
        lat: res[0].latitude,
        lng: res[0].longitude
      }
      resolve(location)
    })
  })
}

module.exports = {getLocation}