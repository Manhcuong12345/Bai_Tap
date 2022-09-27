const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category_Product = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    parentId: {
        type: String,
    },
})

module.exports = mongoose.model('Category_Product', Category_Product)

