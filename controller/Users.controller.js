const User = require('../models/User')
const _ = require('lodash')
const jwt = require('jsonwebtoken')

const { loginValidation, registerValidation } = require('../middleware/validationUser')

class Usercontroller {

    static async reg(req, res) {

        const { error } = registerValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        const emailExist = await User.findOne({ email: req.body.email})
        if(emailExist) return res.status(400).send({message: 'Email is exist in database'})

        const { firstname, password, email, lastname, username, phone, address } = req.body
        const user = new User({
            firstname,
            password,
            email,
            lastname,
            username,
            phone,
            address
        })
        await user.generatePassword();
        await user.save()
        if (!user) return res.status(400).send({ error: 'Not save' })
        res.send(_.pick(user, ['email', 'username', 'address','_id']))

    }

    static async login(req, res) {

        const {error} = loginValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send({ message: 'email is worng in database' })
        const isValid = await user.login(req.body.password) && (user.role === 'user')
        if (!isValid) return res.status(400).send({ message: 'Invalid username or password' })
        const token = jwt.sign({ _id: user._id, role:user.role }, process.env.TOKEN_SECRET)
        res.header('x-auth-token', token).send({_id:user._id})
    }

    static async token(req, res) {
        res.send(req.user)
    }

    static async getall(req, res) {
        const user = await User.find().populate('cart.product')
        if(!user) return res.status(404).send({message:'Not Found'})
        return res.status(200).send(user)
       
        
    }

}




module.exports.Usercontroller = Usercontroller