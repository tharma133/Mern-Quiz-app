const User = require('../model/userModel')
const catchAsync = require('../utils/catchAsync')

exports.getuser = catchAsync(async (req, res, next) => {
  const user = await User.find().populate('questions')
  res.status(200).json({
    status: 'success',
    result: user.length,
    data: {
      user,
    },
  })
})

exports.createuser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body)
  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  })
})

exports.getuserId = catchAsync(async (req, res, next) => {
  let id = req.params.questionId ? req.params.questionId : req.params.id
  const user = await User.findById(id)
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

exports.updateuser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id)
  res.status(204).json({
    status: 'success',
    data: null,
  })
})
