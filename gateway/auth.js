const jwtMiddleware = require('express-jwt')
const jwtSigner = require('jsonwebtoken')
const axios = require('axios')

const { jwtSecret: secret } = require('./config')

const middleware = jwtMiddleware({ secret })

function sign (payload) {
  return jwtSigner.sign(payload, secret)
}

module.exports = {
  middleware,
  sign
}
