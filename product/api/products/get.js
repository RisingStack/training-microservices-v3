"use strict";

const ProductService = require("../../dal/productService");
const logger = require("winston");

const GetProducts = {
  async productByID(ctx) {
    try {
      const result = await ProductService.getProductByID(ctx.params.id);
      if (!result) {
        ctx.status = 404;
        return;
      }
      ctx.body = result;
      ctx.status = 200;
    } catch (err) {
      logger.error(err);
      ctx.status = 500;
    }
  },

  async listAllProducts(ctx) {
    try {
      if (ctx.query.search) {
        ctx.body = Object.assign(
          {},
          {
            products: await ProductService.getProductsBySearch(ctx.query.search)
          }
        );
      } else {
        ctx.body = Object.assign(
          {},
          { products: await ProductService.getAllProducts() }
        );
      }
      ctx.status = 200;
    } catch (err) {
      logger.error(err);
      ctx.status = 500;
    }
  }
};

module.exports = {
  listAllProducts: GetProducts.listAllProducts,
  listProductByID: GetProducts.productByID,
  GetProducts
};
