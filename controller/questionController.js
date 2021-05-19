const Question = require('../model/questionModel')
const catchAsync = require('../utils/catchAsync')

exports.getQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.find()
  res.status(200).json({
    status: 'success',
    result: question.length,
    data: {
      question,
    },
  })
})

exports.createQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.create(req.body)
  res.status(201).json({
    status: 'success',
    data: {
      question,
    },
  })
})

exports.getQuestionId = catchAsync(async (req, res, next) => {
  const question = await Question.findById(req.params.id)
  res.status(200).json({
    status: 'success',
    data: {
      question,
    },
  })
})

exports.updateQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    status: 'success',
    result: question.length,
    data: {
      question,
    },
  })
})

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findByIdAndDelete(req.params.id)
  res.status(204).json({
    status: 'success',
    data: null,
  })
})
