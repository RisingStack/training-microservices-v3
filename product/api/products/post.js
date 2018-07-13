"use strict";

const ProductService = require("../../dal/productService");
const logger = require("winston");

const idempotencyContainer = new Map();

const AddProduct = {
  async addNewProduct(ctx) {
    try {
      const { "x-idempotency": idempotencyKey } = ctx.headers;
      if (idempotencyKey) {
        logger.info(
          "Add new product called with idempotency key:",
          idempotencyKey
        );
        const productId = idempotencyContainer.get(idempotencyKey);

        if (productId) {
          logger.info(
            `The following idempotencyKey (${idempotencyKey}) was already used to create ${productId}`
          );
          ctx.body = await ProductService.getProductByID(productId);
          ctx.status = 201;
          return;
        }
      }

      logger.info("Creating product");
      const createdProduct = await ProductService.insertProduct(
        ctx.request.body
      );
      ctx.body = createdProduct;
      ctx.status = 201;

      if (idempotencyKey) {
        logger.info(
          "Setting idempotency key",
          idempotencyKey,
          createdProduct.id
        );
        idempotencyContainer.set(idempotencyKey, createdProduct.id);
      }
    } catch (err) {
      logger.error(err);
      ctx.status = 500;
    }
  }
};

module.exports = {
  addNewProduct: AddProduct.addNewProduct,
  AddProduct
};
