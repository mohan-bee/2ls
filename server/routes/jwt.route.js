const router = require('express').Router()
const jwtDecoder = require('../controllers/jwt.controller')

router.post('/decode', jwtDecoder)

module.exports  = router