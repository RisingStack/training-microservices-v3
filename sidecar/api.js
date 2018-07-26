'use strict'

const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const circuitBreaker = require('./circuit-breaker')
const proxyMiddleware = require('./proxy-middleware')
const cacheMiddleware = require('./cache')

const router = new Router()

router.use(bodyParser())

router.all('*', circuitBreaker, cacheMiddleware, proxyMiddleware )

module.exports = router
