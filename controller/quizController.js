const Quiz = require('../model/quizModel')
const catchAsync = require('../utils/catchAsync')

exports.getQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.find().populate('questions')
  res.status(200).json({
    status: 'success',
    result: quiz.length,
    data: {
      quiz,
    },
  })
})

exports.createQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.create(req.body)
  res.status(201).json({
    status: 'success',
    data: {
      quiz,
    },
  })
})

exports.getQuizId = catchAsync(async (req, res, next) => {
  let id = req.params.questionId ? req.params.questionId : req.params.id
  const quiz = await Quiz.findById(id)
  res.status(200).json({
    status: 'success',
    data: {
      quiz,
    },
  })
})

exports.updateQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    status: 'success',
    result: quiz.length,
    data: {
      quiz,
    },
  })
})

exports.deleteQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findByIdAndDelete(req.params.id)
  res.status(204).json({
    status: 'success',
    data: null,
  })
})
