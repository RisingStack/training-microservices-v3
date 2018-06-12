'use strict'

const dbConfig = require('./config/db')

module.exports = {
  development: dbConfig,
  staging: dbConfig,
  production: dbConfig
}
