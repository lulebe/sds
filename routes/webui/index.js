const promisify = require('util').promisify
const router = require('express').Router()
const diskusage = promisify(require('diskusage').check)

module.exports = router

router.get('/', async function (req, res) {
  try {
  const diskSpace = await diskusage(__dirname)
  res.render('index', {port: '9000', free: Math.round(diskSpace.available / 1024 / 1024 / 1024 * 100)/100})
  } catch (e) {
    res.status(500).send(e.message)
  }
})