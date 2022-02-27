// LOGGING
console.log("MODE:", process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// REQUIRES && CREATE APP
const express = require('express')
const cors = require('cors')
const morgan = require('morgan') // HTTP request logger middleware for node.js https://www.npmjs.com/package/morgan
const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(cors())

// ROUTE DEFINITIONS
const tests = require('./routes/testRoutes') // <-- Sample

// ROUTE MIDDLEWARE
app.use('/api/tests', tests) // <-- Sample

// APP START & DEV PORT
const port = process.env.PORT
const server  = require('http').Server(app)
server.listen(port, () => console.log(`Server started on port ${port}`))