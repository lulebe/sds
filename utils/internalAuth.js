const config = require('./config')

module.exports = function (key) {
  return key === config.INTERNAL_KEY
}