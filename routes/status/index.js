const router = require('express').Router()

const systemStatusHandler = require('./system').handler

module.exports = router

router.get('/', systemStatusHandler)