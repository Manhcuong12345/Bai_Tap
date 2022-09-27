const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Deal_product = new Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
    },
    content: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity:{
        type: Number,
    },
    discount: {
        type: Number,
    },
    product_img: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

})

module.exports = mongoose.model('Deal_product', Deal_product)