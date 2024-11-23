const express = require('express')
const router = express.Router()
const userControler = require('../controler/userControler')
const auth = require('../middleware/auth')

router.get('/login', auth.isLogin, userControler.loadLogin)

router.post('/login', userControler.login)

router.get('/register', auth.isLogin, userControler.loadRegister)

router.post('/register', userControler.registerUser)

router.get('/home', auth.checkSession, userControler.loadHome)

router.get('/logout', auth.checkSession, userControler.logout)
module.exports = router
