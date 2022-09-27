const mongoose = require('mongoose');
const Schema = mongoose.Schema


const Order = new Schema({
    //chuoi hon hop
    user:{
        type: Schema.Types.Mixed
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    products: [
        {
            product: {
                type: Schema.Types.Mixed,
                ref:'Product'
            },
            number: {
                type: Number,
            },
            price:{
                type: Number,
            }
        }
    ],
    totalprice: {
        type: Number
    },
    status: {
        type: String,
        default:'Pending',
        required: true
    },
    // category:{
    //     type:Schema.Types.ObjectId,
    //     ref:'Category_Product'
    // }
    // paymentType: {
    //     type: String,
    //     enum: ['home', 'card']
    // }
});

module.exports = mongoose.model('Order', Order);