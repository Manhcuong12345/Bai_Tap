const express = require('express');
const router = express.Router()
const upload = require('../middleware/upload')
const {Sliderscontroller} = require('../controller/Sliders.controller')
const auth = require('../middleware/verifyToken')
const {adminMiddleware} = require('../middleware/roleMiddlware')

router.post('/',auth,adminMiddleware,upload.single('img'),Sliderscontroller.createSlide)
router.delete('/:id',auth,adminMiddleware,Sliderscontroller.deleteSlider)
router.put('/:id',auth,adminMiddleware,upload.single('img'),Sliderscontroller.updateSlider)
router.get('/',Sliderscontroller.getSlider)

module.exports = router