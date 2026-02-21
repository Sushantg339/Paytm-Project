const express = require('express')

const {signupController, signinController, updateDetails, getUsers, getMe} = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()

router.post('/signup', signupController)
router.post('/signin', signinController)
router.put('/', authMiddleware, updateDetails)
router.get('/bulk', authMiddleware, getUsers)
router.get('/', authMiddleware, getMe)

module.exports = router