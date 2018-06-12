const {
  PORT: serverPort,
  PRODUCT_WEB_SERVICE_HOST,
  PRODUCT_WEB_SERVICE_PORT,
  USER_WEB_SERVICE_HOST,
  USER_WEB_SERVICE_PORT,
  JWT_SECRET: jwtSecret
} = process.env

const productsAPIURL = `${PRODUCT_WEB_SERVICE_HOST}:${PRODUCT_WEB_SERVICE_PORT}`
const usersAPIURL = `${USER_WEB_SERVICE_HOST}:${USER_WEB_SERVICE_PORT}`

module.exports = {
  serverPort,
  productsAPIURL,
  usersAPIURL,
  jwtSecret
}
