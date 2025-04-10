const jwt = require('jsonwebtoken')

const jwtDecoder =  (req,res) => {
    try {
        const {token, secret} = req.body
        const decoded = jwt.decode(token, {complete: true})
        if(!decoded){
            return res.status(400).json({success: false, msg: "Invalid Token"})
        }
        let verified = null
        if(secret){
             verified = jwt.verify(token, secret)
        }
        return res.status(200).json({success: true, header: decoded.header, payload: decoded.payload, signature: decoded.signature, verified})

    } catch (error) {
        return res.status(500).json({success: false, msg: "Internal Server Error", desc: error.message})
    }
}

module.exports = jwtDecoder