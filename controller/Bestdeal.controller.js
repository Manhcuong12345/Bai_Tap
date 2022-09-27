const Deal_product = require('../models/Deal_product')
const _ = require('lodash')


class Bestdealcontroller {
     static async createBestdeal(req, res) {
         let props = _.pick(req.body,['name','slug','description','content','price','quantity','discount','product_img','createdBy'])
         var host = 'https://lh3.google.com/u/0/d/'
         if(req.file){
             props.product_img = host + req.file.fileId
         }

         const products = await new Deal_product(props)
         products.save()
         if(!products) return res.status(400).send({err_message:'Not save'})
         res.status(200).send(products)
     }

     static async deleteBestdeal(req, res) {
         const products = await Deal_product.findByIdAndDelete(req.params.id)
         if(!products) return res.status(400).send({err_message:'Not delete'})
         res.send(products)
     }

     static async getBestdeal(req, res){
         const products = await Deal_product.find({})
         if(!products) return res.status(404).send({err_message:'Not found'})
         res.send(products)
     }

     static async updateBestdeal(req, res){
         const products = await Deal_product.findByIdAndUpdate(req.params.id,req.body)
         if(!products) return res.status(404).send({err_message:'Not update'})
         res.send(products)
     }
}





module.exports.Bestdealcontroller = Bestdealcontroller