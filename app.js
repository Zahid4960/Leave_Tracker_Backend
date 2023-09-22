require('dotenv').config()

const express = require('express')
const swaggerUi = require('swagger-ui-express');
const jsyaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT

const testRoute = require('./routers/test.router')

const dbConfig = require('./config/dbConfig')
const superAdminUserConfig = require('./config/superAdminUserConfig')


const app = express()

dbConfig.dbConnection()
superAdminUserConfig.createSuperAdminUser()

// Load YAML file
const swaggerDocument = jsyaml.load(fs.readFileSync(path.join(__dirname, './swagger/index.yaml'), 'utf8'))

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Hello from leave tracker backend!')
})

app.use('/api/test', testRoute)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})