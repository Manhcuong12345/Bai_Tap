const express = require('express');
const User = require('../models/User')
const _ = require('lodash')

class Cartscontroller {

    static async addCart(req, res) {
        // const user =await User.findById(req.user._id)
        const user =await User.findById(req.user._id && req.user.role)
        const cart_product = _.pick(req.body,['product', 'number','price'])
        if(!user) return res.status(404).send({err_message: "User not found"})
        user.cart = (!user.cart) ? [] : user.cart
        if(user.cart.length == 0){
            user.cart = [cart_product]
        }
        if(user.cart.length > 0){
           let index = user.cart.findIndex(cart => cart.product == req.body.product)
           if(index == -1){
               user.cart.splice(0,0,cart_product)
           }
           else{
               user.cart[index].number = user.cart[index].number + parseInt(cart_product.number)
           }
        }
        await user.save();
        res.send(user)
    }

    static async getCart(req, res){
        if(req.user.role == 'admin'){
            return res.status(404).send({err_message: "User not found"})
        }
        const user = await User.findById(req.user._id).populate('cart.product');
        if(!user) return res.status(404).send({err_message: "User not found"})
        // user.role = (!user.role === 'admin') ? [] : user.role==='admin'
        const { cart } = user
        res.send(cart)
    }


}

module.exports.Cartscontroller = Cartscontroller