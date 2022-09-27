const express = require('express')
const router = express.Router()
const {Orderscontroller} = require('../controller/Orders.controller')
const auth = require('../middleware/verifyToken')
const {userMiddleware} = require('../middleware/roleMiddlware')

router.put('/:id',auth,Orderscontroller.updateStatus)
router.post('/',auth,userMiddleware,Orderscontroller.createOrder)
router.get('/',auth,Orderscontroller.getOrder)

module.exports = router