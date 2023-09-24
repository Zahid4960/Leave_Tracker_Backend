require('dotenv').config()

const express = require('express')
const swaggerUi = require('swagger-ui-express');
const jsyaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT

const authRoute = require('./routers/authRouter')

const { dbConnection } = require('./config/dbConfig')
const { createSuperAdminUser } = require('./config/superAdminUserConfig')


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

dbConnection()
createSuperAdminUser()

// Load YAML file
const swaggerDocument = jsyaml.load(fs.readFileSync(path.join(__dirname, './swagger/index.yaml'), 'utf8'))

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Hello from leave tracker backend!')
})

app.use('/api/user', authRoute)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})