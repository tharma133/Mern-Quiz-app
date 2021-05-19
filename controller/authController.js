const User = require('../model/userModel')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const sendMail = require('../utils/email')

const signIn = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const createSendToken = (user, statusCode, req, res) => {
  const token = signIn(user._id)
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnle: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  }

  cookieOption.secure = true
  res.cookie('jwt', token, cookieOption)

  user.password = undefined
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })
  createSendToken(user, 201, req, res)
})
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(new AppError('Please enter email and password', 400))
  }
  const currentUser = await User.findOne({ email }).select('+password')

  if (
    !currentUser ||
    !(await currentUser.correctPassword(password, currentUser.password))
  ) {
    return next(new AppError('Please provide a valid email and password', 401))
  }

  createSendToken(currentUser, 200, req, res)
})

exports.protect = catchAsync(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET)
  const currentUser = await User.findById(decoded.id)

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    )
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    )
  }
  req.user = currentUser
  next()
})

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body

  if (!email) {
    return next(new AppError('Please provde a email ID', 404))
  }

  const user = await User.findOne({ email })

  if (!user) {
    return next(new AppError('There is no user with email address', 404))
  }

  const resetToken = user.createResetToken()
  await user.save({ validateBeforeSave: false })

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/quiz/resetPassword/${resetToken}`
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`

  try {
    await sendMail({
      to: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    })

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetExpiresIn = undefined
    await user.save({ validateBeforeSave: false })
    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    )
  }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiresIn: { $gt: Date.now() },
  })
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400))
  }
  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm

  user.passwordResetToken = undefined
  user.passwordResetExpiresIn = undefined
  await user.save()
  createSendToken(user, 200, req, res)
})
