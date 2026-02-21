const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const { getBalance, transferAmount } = require('../controllers/account.controller')

const router = express.Router()


router.use(authMiddleware)
router.get('/balance', getBalance)
router.post('/transfer', transferAmount)

module.exports = router