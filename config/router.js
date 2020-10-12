const router = require('express').Router()
const users = require('../controllers/userData')

// router.route('/users')
//   .get(users.index)

// router.route('/users/:id')
//   .post(users.edit)

router.route('/allusers')
  .get(users.get)

module.exports = router
