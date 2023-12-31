require('dotenv').config()

const express = require('express')
const swaggerUi = require('swagger-ui-express');
const jsYaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT
const authRoute = require('./routers/auth.router')
const officeTypeRoute = require('./routers/office-type.router')
const { dbConnection } = require('./config/db.config')
const { createSuperAdminUser } = require('./config/super-admin-user.config')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

dbConnection()
createSuperAdminUser()

// Load YAML file
const swaggerDocument = jsYaml.load(fs.readFileSync(path.join(__dirname, './swagger/index.yaml'), 'utf8'))

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Hello from leave tracker backend!')
})

app.use('/api/user', authRoute)
app.use('/api/office-type', officeTypeRoute)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})