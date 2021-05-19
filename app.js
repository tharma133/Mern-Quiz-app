const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes')
const questionRoutes = require('./routes/questionRoutes')
const quizRoutes = require('./routes/quizRoutes')
const submitRoutes = require('./routes/submitRoutes')
const globalErrorHandler = require('./controller/errorController')
const AppError = require('./utils/appError')
const app = express()

app.use(express.json())

app.use(cors)

app.use('/api/v1/question', questionRoutes)
app.use('/api/v1/quiz', quizRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/submit', submitRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app
