'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  PORT: joi.number().integer().min(0).required(),
  APP_PORT: joi.number().integer().min(0).required(),
  CIRCUIT_BREAKER: joi.boolean().default(true),
  CACHE: joi.boolean().default(true),
}).unknown()
  .required()

const envVars = joi.attempt(process.env, envVarsSchema)

const config = {
  port: envVars.PORT,
  logger: {
    level: envVars.LOGGER_LEVEL
  },
  circuitBreaker: envVars.CIRCUIT_BREAKER,
  cache: envVars.CACHE,
  appPort: envVars.APP_PORT
}

module.exports = config
