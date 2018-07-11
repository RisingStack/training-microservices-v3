const {
  PORT: serverPort,
  PRODUCT_WEB_SERVICE_HOST,
  PRODUCT_WEB_SERVICE_PORT,
  USER_WEB_SERVICE_HOST,
  USER_WEB_SERVICE_PORT,
  JWT_SECRET: jwtSecret,
  REDIS_HOST
} = process.env

const productsAPIURL = `${PRODUCT_WEB_SERVICE_HOST}:${PRODUCT_WEB_SERVICE_PORT}`
const usersAPIURL = `${USER_WEB_SERVICE_HOST}:${USER_WEB_SERVICE_PORT}`

const redisClient = require('redis').createClient({host: REDIS_HOST})

module.exports = {
  serverPort,
  productsAPIURL,
  usersAPIURL,
  jwtSecret,
  redisClient
}
