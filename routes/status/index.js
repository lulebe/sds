const router = require('express').Router()

const systemStatusHandler = require('./system').handler
const allocSpaceHandler = require('./allocSpace').handler
const deallocSpaceHandler = require('./deallocSpace').handler

module.exports = router

router.get('/', systemStatusHandler)
router.get('/allocSpace', allocSpaceHandler)
router.get('/deallocSpace', deallocSpaceHandler)