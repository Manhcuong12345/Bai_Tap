const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const User = new Schema({

    firstname: {
        type: String,
        min: 2,
        max: 20,
    },
    lastname: {
        type: String,
        min: 5,
        max: 20
    },
    username: {
        type: String,
        min:5,
        max:15
    },
    email: {
        type: String,
        min:15,
        max:40
    },
    password: {
        type: String,
        min:8,
        max:20
    },
    address: {
        type: String,
        min: 8,
        max: 100
    },
    phone: {
        type: String,
        min: 10
    },
    cart:[
        {
            product: {
                type: Schema.Types.Mixed,
                ref: "Product"
            },
            number:{
               type:Number,
            },
           price:{
               type:Number
           }
        }
    ],
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
})

User.methods.generatePassword = async function () {
    this.password = bcrypt.hashSync(this.password, 10)
}

User.methods.login = async function(password){
    return await bcrypt.compareSync(password, this.password)
}

// User.virtual('password')
// .set(function(password){
//     this.hash_password = bcrypt.hashSync(password, 10);
// })


// User.methods ={ authenticate: async function(password){
//     return await bcrypt.compareSync(password, this.password)
// }

// }

module.exports = mongoose.model('User', User)