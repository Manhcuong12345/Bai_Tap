const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
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
    reviews: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            review: String
        }
    ],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category_Product',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})


module.exports = mongoose.model('Product', Product)

