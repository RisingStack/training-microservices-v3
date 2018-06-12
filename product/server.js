'use strict'

const Koa = require('koa')
const logger = require('winston')
const api = require('./api')
const koaLogger = require('koa-logger')
const cors = require('koa2-cors')

const app = new Koa()

app.proxy = true

app
  .use(cors({
    origin: '*'
  }))
  .use(koaLogger())
  .use(api.routes())
  .use(api.allowedMethods())

app.on('error', (err) => {
  logger.error('Server error', { error: err.message })
  throw err
})

module.exports = app
