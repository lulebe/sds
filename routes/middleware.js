const promisify = require('util').promisify
const bcryptCompare = promisify(require('bcrypt').compare)

const config = require('../utils/config')

module.exports = {
  publicAuth
}

function publicAuth (req, res, next) {
  const password = req.body.password || req.headers.Authorization || req.query.password
  if (!password) {
    res.status(401).send('user not authenticated')
    return
  }
  bcryptCompare(password, config.PUBLIC_KEY_HASH)
  .then(res => {
    if (!res) return Promise.reject(new Error('invalid Password'))
    next()
  })
  .catch(e => {
    res.status(401).send(e.message)
  })
}