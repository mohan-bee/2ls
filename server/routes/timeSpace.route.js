const getTimeSpace = require('../controllers/timeSpace.controller')
const router = require('express').Router()

router.post('/response', getTimeSpace)

module.exports = router