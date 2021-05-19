const mongoose = require('mongoose')

const submitSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.ObjectId,
    ref: 'Quizzes',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  totalScore: {
    type: Number,
    default: 0,
  },
})

submitSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'quiz',
  }).populate({
    path: 'user',
    select: 'username total',
  })
  next()
})

const Submit = mongoose.model('Submit', submitSchema)

module.exports = Submit
