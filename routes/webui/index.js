const promisify = require('util').promisify
const router = require('express').Router()
const diskusage = promisify(require('diskusage').check)
const bodyParser = require('body-parser')

const publicAuthMW = require('../middleware').publicAuth
const peerList = require('../../network/peerList')

module.exports = router

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))

router.get('/', async function (req, res) {
  try {
  const diskSpace = await diskusage(__dirname)
  res.render('index', {
    port: '9000',
    free: Math.round(diskSpace.available / 1024 / 1024 / 1024 * 100)/100,
    addedServer: req.query.addedServer !== undefined
  })
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.post('/addServer', [publicAuthMW], async function (req, res) {
  try {
    peerList.addPeer(req.body.address)
    res.redirect('/webui?addedServer')
  } catch (e) {
    res.status(500).send(e.message)
  }
})