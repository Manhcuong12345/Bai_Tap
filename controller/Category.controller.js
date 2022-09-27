const Category_Product = require('../models/Category_Product')
const slugify = require('slugify')

class Categorycontroller {

  static async createCategory(req, res) {

    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name)
    }
    //category_parent bao gom title, slugify
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId
    }
    //Luu du lieu nhap
    const cat = new Category_Product(categoryObj)
    cat.save((error, category) => {
      if (error) return res.status(400).send({ message: 'Fail!' })
      if (category) {
        return res.status(200).send(category)
      }
    })
  }

  static async deleteCategory(req, res) {
    const deleteCategory = await Category_Product.findByIdAndDelete(req.params.id)
    if (!deleteCategory) res.status(400).send({ error: 'Not found' })
    res.send(deleteCategory)
  }

  static async updateCategory(req, res) {
    const form = req.body
    const updatecategory = await Category_Product.findByIdAndUpdate(req.params.id, form)
    if (!updatecategory) res.status(400).send({ error: 'Not found' })
    res.send(updatecategory)
  }
  
  static async Categoryall(req, res) {
    const categories = await Category_Product.find({})
    if (categories) {
      const categoryList = createCategories(categories)
      res.status(200).send({ categoryList })
    } else {
      res.status(400).send({ error })
    }
  }

  //Get category detail
  static async detailCategory(req,res) {
        const category = await Category_Product.findById(req.params.id)
        if(!category) return res.status(400).send({err_message: 'Category not found'})
        res.send(category)
  }

}

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id)
    });
  }

  return categoryList;
}


module.exports.Categorycontroller = Categorycontroller