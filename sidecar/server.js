'use strict'

const Koa = require('koa')
const api = require('./api')
const cors = require('koa2-cors')

const app = new Koa()

app.proxy = true

app
  .use(cors({
    origin: '*'
  }))
  .use(api.routes())
  .use(api.allowedMethods())

app.on('error', (err) => {
  console.error('Server error', { error: err.message })
  throw err
})

module.exports = app
