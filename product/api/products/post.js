'use strict'

const ProductService = require('../../dal/productService')
const logger = require('winston')

const AddProduct = {
  async addNewProduct(ctx) {
    try {
      ctx.body = await ProductService.insertProduct(ctx.request.body)
      ctx.status = 201
    } catch (err) {
      logger.error(err)
      ctx.status = 500
    }
  }
}

module.exports = {
  addNewProduct: AddProduct.addNewProduct,
  AddProduct
}
