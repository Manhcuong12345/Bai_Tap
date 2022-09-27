const express = require('express')
const authRoute = require("../route/auths")
const userRoute = require("../route/users")
const sliderRoute = require("../route/slider")
const productRoute = require("../route/product")
const orderRoute = require("../route/order")
const categoryRoute = require("../route/category")
const cartRoute = require("../route/cart")
const dealRoute = require("../route/deal")



module.exports = function (app) {
    app.use(express.json());

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
        res.header("Access-Control-Expose-Headers", "x-auth-token");
        next();
    });
    app.use('/api/auth', authRoute)
    app.use('/api/user', userRoute)
    app.use('/api/slider', sliderRoute)
    app.use('/api/product', productRoute)
    app.use('/api/order', orderRoute)
    app.use('/api/category', categoryRoute)
    app.use('/api/cart',cartRoute)
    app.use('/api/bestdeal', dealRoute)
}