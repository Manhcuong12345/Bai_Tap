const Product = require('../models/Product')
const _ = require('lodash')
// const slugify = require('slugify')
const fs = require('fs')

class Productcontroller {

    static async createProduct(req, res) {
        // const { name,description, content, quantity ,category, price, offer, createdBy,price_sell } = req.ody
        //Kiem tra file phan hoib
        // let product_img = []
        // if (req.files.length > 0) {
        //     product_img = req.files.map(file => {
        //         return { img: file.filename }
        //     })
        // }
        let props = _.pick(req.body, ['name', 'description', 'content', 'quantity', 'category', 'price', 'createdBy', 'discount', 'slug'])
        let host = 'https://lh3.google.com/u/0/d/'
        if (req.file) {
            props.product_img = host + req.file.fileId
        }
        // const field = {name :name}
        // new Product(field) = new Product({name: name})
        const product = await new Product(props)
        product.save()
        if (!product) return res.status(400).send({ error_message: 'Not save product' })
        res.send(product)
    }

    static async deleteProduct(req, res) {
        const products = await Product.findByIdAndDelete(req.params.id)
        // const path = 'public/' + products.product_img
        // try {
        //     fs.unlink(path, function (err) {
        //         if (err) {
        //             console.log(err)
        //         }
        //     })
        // } catch (err) {
        //     console.log(err)
        // }

        if (!products) res.status(404).send({ error: 'Product not delete' })
        res.status(200).send({ message: 'Product delete success!' })
    }

    static async getAll(req, res) {
        //Loc san pham theo danh muc
        let filter = {}
        if (req.query.categories) {
            filter = { category: req.query.categories.split(',') }
        }
        if (req.query.increase) {
            filter.price = { $gte: req.query.increase }
        }
        if (req.query.decrease) {
            filter.price = { $lte: req.query.decrease }
        }
        const productList = await Product.find(filter).populate('category')

        if (!productList) res.status(404).send({ error: 'Not Found' })
        res.status(200).send(productList)
    }


    //Lay tung danh sach product 
    static async detailProduct(req, res) {
        const product = await Product.findById(req.params.id).populate('category')
        if (!product) res.status(404).send({ error: 'Not found' })
        res.status(200).send(product)
    }

    static async updateProduct(req, res) {
        const formdata = req.body
        const update = await Product.findByIdAndUpdate(req.params.id, formdata)
        if (!update) res.status(404).send({ error: 'Product not update' })
        res.send(update)
    }


}


module.exports.Productcontroller = Productcontroller