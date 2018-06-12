'use strict'

const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const productController = require('./products')

const router = new Router()

router.use(bodyParser())

router.get('/healthcheck', (ctx) => {
  ctx.body = 'Products service is up!'
})

// PRODUCTS
router.get('/products', productController.listAllProducts)
router.get('/products/:id', productController.listProductByID)

router.put('/products/:id', productController.editProduct)
router.post('/products', productController.addNewProduct)
router.delete('/products/:id', productController.deleteProduct)

module.exports = router
