'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  PORT: joi.number().integer().min(0).required(),
  TOKEN_SECRET: joi.string().default('my_secret_token'),
  TOKEN_EXPIRATION: joi.string().default('1h'),
  LOGGER_LEVEL: joi.string()
}).unknown()
  .required()

const envVars = joi.attempt(process.env, envVarsSchema)

const config = {
  port: envVars.PORT,
  tokenSecret: envVars.TOKEN_SECRET,
  tokenExpiration: envVars.TOKEN_EXPIRATION,
  logger: {
    level: envVars.LOGGER_LEVEL
  }
}

module.exports = config
