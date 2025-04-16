const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000
require('dotenv').config()
app.use(express.json())

app.use(cors({
    origin: '*'
}))
app.use('/api/jwt', require('./routes/jwt.route'))
app.use('/api/base64', require('./routes/base64.route'))
app.use('/api/yt', require('./routes/yt.route'))
app.use('/api/time-space', require('./routes/timeSpace.route'))

    
app.listen(PORT, () => {
    try {
        console.log("Server is Running at",PORT )
    } catch (error) {
        console.log("Error", error.message)
    }
})