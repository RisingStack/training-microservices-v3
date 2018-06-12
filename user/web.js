'use strict'

const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ silent: true })
}

const { promisify } = require('util')
const http = require('http')
const logger = require('winston')
const app = require('./server')
const config = require('./config/server')

logger.default.transports.console.colorize = true
logger.level = config.logger.level

const server = http.createServer(app.callback())
const serverListen = promisify(server.listen).bind(server)

serverListen(config.port)
  .then(() => {
    logger.info(`Users service is up and running on localhost:${config.port}`)
  })
  .catch((err) => {
    logger.error(err)
    process.exit(1)
  })
