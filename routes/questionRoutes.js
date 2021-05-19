const express = require('express')
const { protect } = require('../controller/authController')
const {
  getQuestion,
  createQuestion,
  getQuestionId,
  updateQuestion,
  deleteQuestion,
} = require('../controller/questionController')

const router = express.Router()

router.route('/').get(getQuestion).post(createQuestion)

router
  .route('/:id')
  .get(getQuestionId)
  .patch(updateQuestion)
  .delete(deleteQuestion)

module.exports = router
