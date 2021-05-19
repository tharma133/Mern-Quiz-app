const express = require('express')
// const { protect } = require('../controller/authController')

const {
  getSubmit,
  createSubmit,
  getSubmitId,
  updateSubmit,
  deleteSubmit,
} = require('../controller/submitController')

const router = express.Router()

router.route('/').get(getSubmit).post(createSubmit)

router.route('/:id').get(getSubmitId).patch(updateSubmit).delete(deleteSubmit)
module.exports = router
