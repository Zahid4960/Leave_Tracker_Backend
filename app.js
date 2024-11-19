require('dotenv').config()

const authRouter = require('./routers/authRouter')
const { createSuperAdminUser } = require('./config/super-admin-user.config')
const DbConnectionConfig = require('./config/dbConnection')
const express = require('express')
const fs = require('fs')
const jsYaml = require('js-yaml')
const officeTypeRoute = require('./routers/office-type.router')
const path = require('path')
const swaggerUi = require('swagger-ui-express')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

DbConnectionConfig.connect()
// createSuperAdminUser()

const apiVersion = 'v1'
const swaggerDocument = jsYaml.load(fs.readFileSync(path.join(__dirname, './swagger/index.yaml'), 'utf8'))
app.use(`/${apiVersion}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(`/api/${apiVersion}/auth`, authRouter)
app.use(`/api/${apiVersion}/office-type`, officeTypeRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})