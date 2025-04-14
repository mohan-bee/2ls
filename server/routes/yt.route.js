const router = require('express').Router()
const downloadYT = require('../controllers/yt.controller')

router.get('/download', downloadYT)

module.exports = router