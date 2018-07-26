'use strict'

const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ silent: true })
}

const { promisify } = require('util')
const http = require('http')
const app = require('./server')
const config = require('./config')

const server = http.createServer(app.callback())
const serverListen = promisify(server.listen).bind(server)

serverListen(config.port)
  .then(() => {
    console.log(`Sidecar is up and running on localhost:${config.port}`)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
