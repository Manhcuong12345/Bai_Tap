const mongoose = require('mongoose')
const Schema = mongoose.Schema
//xuat ra phan course
const Slider = new Schema({
  name: {
    type: String, 
    required: true
  },
  img: {
    type: String
  },

})

module.exports = mongoose.model('Slider', Slider)