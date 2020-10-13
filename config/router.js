const router = require('express').Router()
const users = require('../controllers/userData')

router.route('/users')
  .get(users.index)

router.route('/allusers')
  .get(users.get)

router.route('/allusers/:id')
  .delete(users.delete)

module.exports = router
