const express = require('express')
const router = express.Router()
const { Cartscontroller } = require('../controller/Cart.controller')
const auth = require('../middleware/verifyToken')
const {userMiddleware} = require('../middleware/roleMiddlware')


router.post('/',auth,userMiddleware,Cartscontroller.addCart)
router.get('/',auth,Cartscontroller.getCart)

module.exports = router