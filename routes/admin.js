const express = require('express')
const router = express.Router()
const adminControler = require('../controler/adminControler')
const adminAuth = require('../middleware/adminAuth')

router.get('/login',adminAuth.isLogin,adminControler.loadLogin)

router.post('/login',adminControler.login)

router.get('/dashboard',adminAuth.checkSession,adminControler.loadDashboard)

router.get('/logout', adminControler.logout, adminControler.loadLogin);

router.post('/edit', adminControler.editUser);

router.post('/delete', adminControler.deleteUser);

router.post('/add', adminControler.addUser);


module.exports = router