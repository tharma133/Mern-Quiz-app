const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
  questions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Question',
    },
  ],
})

const Quiz = mongoose.model('Quizzes', quizSchema)

module.exports = Quiz
