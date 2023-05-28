const express = require('express')
const cors = require('cors')

const ApiError = require('./app/api-error')
const contactRouter = require('./app/routers/contact.router')
const groupRouter = require('./app/routers/groups.router')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactRouter)
app.use('/api/groups', groupRouter)

app.get("/", (req, res) => {
    res.json({
        message: 'Welcome to contact book application.'
    })
})

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'))
})

app.use((err, req, res, next) => {
    console.log(err.message);
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal server error'
    })
})

module.exports = app