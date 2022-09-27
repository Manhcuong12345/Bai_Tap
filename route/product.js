const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const { Productcontroller } = require('../controller/Product.controller')
const auth = require('../middleware/verifyToken')
const { adminMiddleware } = require('../middleware/roleMiddlware')

router.get('/', Productcontroller.getAll)
router.get('/:id', Productcontroller.detailProduct)
router.post('/', auth, adminMiddleware, upload.single("product_img"), Productcontroller.createProduct)
router.delete('/:id', auth, adminMiddleware, Productcontroller.deleteProduct)
router.put('/:id', auth, adminMiddleware, upload.single('product_img'), Productcontroller.updateProduct)

module.exports = router