const promisify = require('util').promisify
const bcryptCompare = promisify(require('bcrypt').compare)

const config = require('./config.js')

module.exports = function (pw) {
  return bcryptCompare(pw, hash)
  .then(res => {
    if (!res) return Promise.reject(new Error())
    return true
  })
  .catch(e => {
    return Promise.reject(new Error('invalid Password'))
  })
}