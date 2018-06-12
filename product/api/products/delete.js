'use strict'

const ProductService = require('../../dal/productService')
const logger = require('winston')

async function deleteProduct(ctx) {
  try {
    const result = await ProductService.delete(ctx.params.id)
    if (result === 1) {
      ctx.status = 200
    } else {
      ctx.status = 404
    }
  } catch (err) {
    logger.error(err)
    ctx.status = 500
  }
}


module.exports = {
  deleteProduct
}
