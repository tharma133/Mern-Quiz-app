const express = require('express')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/userRoutes')
const questionRoutes = require('./routes/questionRoutes')
const quizRoutes = require('./routes/quizRoutes')
const submitRoutes = require('./routes/submitRoutes')
const globalErrorHandler = require('./controller/errorController')
const AppError = require('./utils/appError')
const app = express()

app.enable('trust proxy')

app.use(express.json())

app.use(cors)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use(helmet())

app.use(cookieParser())

app.use(mongoSanitize())

app.use(xss())

app.use(hpp())

app.use('/api/v1/question', questionRoutes)
app.use('/api/v1/quiz', quizRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/submit', submitRoutes)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app
