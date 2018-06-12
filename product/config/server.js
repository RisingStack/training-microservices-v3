'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  PORT: joi.number().integer().min(0).required(),
  LOGGER_LEVEL: joi.string().default('info')
}).unknown()
  .required()

const envVars = joi.attempt(process.env, envVarsSchema)

const config = {
  port: envVars.PORT,
  logger: {
    level: envVars.LOGGER_LEVEL
  }
}

module.exports = config
