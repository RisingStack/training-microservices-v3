'use strict'

const ProductService = require('../../dal/productService')
const logger = require('winston')

const EditProduct = {
  async editProduct(ctx) {
    try {
      ctx.body = await ProductService.edit(ctx.params.id, ctx.request.body)
      ctx.status = 200
    } catch (err) {
      logger.error(err)
      ctx.status = 500
    }
  }
}


module.exports = {
  editProduct: EditProduct.editProduct,
  EditProduct
}
