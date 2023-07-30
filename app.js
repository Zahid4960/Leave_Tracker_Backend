require('dotenv').config();

const express = require('express')
const port = process.env.PORT
const testRoute = require('./routes/testRoute')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello from leave tracker backend!')
})

app.use('/api/test', testRoute)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})