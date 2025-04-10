const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000
app.use(express.json())

app.use(cors())
app.use('/api/jwt', require('./routes/jwt.route'))
app.use('/api/base64', require('./routes/base64.route'))

app.listen(PORT, () => {
    try {
        console.log("Server is Running at",PORT )
    } catch (error) {
        console.log("Error", error.message)
    }
})