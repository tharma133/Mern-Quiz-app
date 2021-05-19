const Submit = require('../model/submitModel')
const catchAsync = require('../utils/catchAsync')

exports.getSubmit = catchAsync(async (req, res, next) => {
  const submit = await Submit.find().populate('questions')
  res.status(200).json({
    status: 'success',
    result: submit.length,
    data: {
      submit,
    },
  })
})

exports.createSubmit = catchAsync(async (req, res, next) => {
  const submit = await Submit.create(req.body)
  res.status(201).json({
    status: 'success',
    data: {
      submit,
    },
  })
})

exports.getSubmitId = catchAsync(async (req, res, next) => {
  let id = req.params.questionId ? req.params.questionId : req.params.id
  const submit = await Submit.findById(id)
  res.status(200).json({
    status: 'success',
    data: {
      submit,
    },
  })
})

exports.updateSubmit = catchAsync(async (req, res, next) => {
  const submit = await Submit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    status: 'success',
    result: submit.length,
    data: {
      submit,
    },
  })
})

exports.deleteSubmit = catchAsync(async (req, res, next) => {
  const submit = await Submit.findByIdAndDelete(req.params.id)
  res.status(204).json({
    status: 'success',
    data: null,
  })
})
