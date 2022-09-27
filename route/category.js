const express = require('express')
const router = express.Router()
const {Categorycontroller} = require('../controller/Category.controller')
const auths = require('../middleware/verifyToken')
const {adminMiddleware} = require('../middleware/roleMiddlware')

router.post('/',auths,adminMiddleware,Categorycontroller.createCategory)
router.delete('/:id',auths,adminMiddleware,Categorycontroller.deleteCategory)
router.put('/:id',auths,adminMiddleware,Categorycontroller.updateCategory)
router.get('/',Categorycontroller.Categoryall)
router.get('/:id',Categorycontroller.detailCategory)

module.exports = router