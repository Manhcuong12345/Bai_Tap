const express = require('express')
const router =  express.Router()
const {Usercontroller} = require('../controller/Users.controller')


router.post('/register',Usercontroller.reg)
router.post('/login',Usercontroller.login)

module.exports = router