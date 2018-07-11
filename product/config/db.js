'use strict'

const path = require('path')
const joi = require('joi')
const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ silent: true })
}

const envVarsSchema = joi.object({
  DB_HOST: joi.string().required(),
  DB_USER: joi.string().required(),
  DB_PASSWORD: joi.string().allow('').required(),
  DB_DATABASE: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_POOL_MIN: joi.number().default(1),
  DB_POOL_MAX: joi.number().default(20),
  DB_DEBUG: joi.bool().default(false)
}).unknown()
  .required()

const envVars = joi.attempt(process.env, envVarsSchema)

const config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
  },
  pool: {
    min: envVars.DB_POOL_MIN,
    max: envVars.DB_POOL_MAX
  },
  migrations: {
    directory: path.join(__dirname, '../migrations')
  },
  debug: envVars.DB_DEBUG
}

module.exports = config
