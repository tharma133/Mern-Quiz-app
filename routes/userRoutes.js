const express = require('express')
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
} = require('../controller/authController')
const {
  createuser,
  getuser,
  updateuser,
  getuserId,
  deleteUser,
} = require('../controller/userController')

const router = express.Router()

router.route('/signup').post(signup)
router.route('/login').post(login)

router.route('/forgetPassword').post(forgetPassword)
router.route('/resetPassword/:token').patch(resetPassword)

router.route('/').get(getuser).post(createuser)

router.route('/:id').get(getuserId).patch(updateuser).delete(deleteUser)

module.exports = router
