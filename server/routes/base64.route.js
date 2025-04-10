const router = require('express').Router()
const {base64Encode, base64Decode} = require('../controllers/base64.controller')

router.post('/encode', base64Encode)
router.post('/decode', base64Decode)

module.exports  = router