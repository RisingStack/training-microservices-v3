'use strict'

const { listAllProducts, listProductByID } = require('./get')
const { addNewProduct } = require('./post')
const { editProduct } = require('./put')
const { deleteProduct } = require('./delete')

const ProductController = {
  listAllProducts,
  listProductByID,
  addNewProduct,
  editProduct,
  deleteProduct
}

module.exports = ProductController
