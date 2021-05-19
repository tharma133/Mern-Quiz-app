const mongoose = require('mongoose')
const dotenv = require('dotenv')

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION: Shutting down')
  console.log(err.name, err.message)
  process.exit(1)
})

dotenv.config()
const app = require('./app')

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected')
  })
  .catch((err) => {
    console.log(err)
  })

const port = process.env.PORT || 5000

const server = app.listen(port, () => {
  console.log(`App running on ${port}`)
})

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION Shutting down')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED, Shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
  })
})
