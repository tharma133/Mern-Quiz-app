const express = require('express')
const { protect } = require('../controller/authController')
const {
  getQuiz,
  createQuiz,
  getQuizId,
  updateQuiz,
  deleteQuiz,
} = require('../controller/quizController')

const router = express.Router()

router.route('/').get(getQuiz).post(createQuiz)

router.route('/:id').get(getQuizId).patch(updateQuiz).delete(deleteQuiz)
module.exports = router
