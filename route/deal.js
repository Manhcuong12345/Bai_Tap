const express = require('express')
const router = express.Router()
const {Bestdealcontroller} = require('../controller/Bestdeal.controller')
const {adminMiddleware} = require('../middleware/roleMiddlware')
const auth = require('../middleware/verifyToken')

router.get('/',Bestdealcontroller.getBestdeal)
router.post('/',auth,adminMiddleware,Bestdealcontroller.createBestdeal)
router.delete('/:id',auth,adminMiddleware,Bestdealcontroller.deleteBestdeal)
router.put('/:id',auth,adminMiddleware,Bestdealcontroller.updateBestdeal)
module.exports = router

