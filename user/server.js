'use strict'

const Koa = require('koa')
const logger = require('winston')
const koaLogger = require('koa-logger')
const router = require('./api/')

const app = new Koa()
const cors = require('koa2-cors')

app.proxy = true

app
  .use(cors({
    origin: '*'
  }))
  .use(koaLogger())
  .use(router.routes())
  .use(router.allowedMethods())

app.on('error', (err) => {
  logger.error('Server error', { error: err.message })
  throw err
})

module.exports = app
