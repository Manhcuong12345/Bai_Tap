const Order = require('../models/Order')
const User = require('../models/User')
const _ = require('lodash')


class Orderscontroller {

  static async createOrder(req, res) {
    const users = await User.findById(req.user._id)
    if (!users) return res.status(404).send({ err_message: "User not found" })
    //Lay ra thong tin tu phan cart cua khach hang
    const products = users.cart.map(i => {
      return { number: i.number, product: i.product, price: i.price}
    })
  
    //Tong tien san pham
    products.totalprice = users.cart.reduce((total, item) => {
      return total + item.number * item.price
    }, 0)

    const { status,address,city } = req.body

    const order = await new Order({
      user:users,
      status: status,
      address: address,
      city: city,
      products: products,
      totalprice: products.totalprice,
    })

    order.save()
    if (!order) return res.status(400).send({ err_message: 'Is not save Order !' })
    res.send(order)
  }


  static async updateStatus(req, res) {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body)
    if (!order) return res.status(400).send({ message: ' Is not update status!' })
    res.send(order)
  }

  static async getOrder(req, res) {
    const user = await User.findById(req.user._id)
    if(!user) return res.status(404).send({ message: 'User not found!'})
    const order = await Order.find({}).populate('products.product')
    if (!order) return res.status(404).send({ message: 'Not found!' })
    return res.status(200).send(order)
  }

}


 // .populate({ 
      //   path: 'products', populate:{ 
      //   path: 'product',populate: 'category' }
      // })

module.exports.Orderscontroller = Orderscontroller