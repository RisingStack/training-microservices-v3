const {
  PORT: serverPort,
  PRODUCTS_API_URL: productsAPIURL,
  USERS_API_URL: usersAPIURL,
  JWT_SECRET: jwtSecret
} = process.env

module.exports = {
  serverPort,
  productsAPIURL,
  usersAPIURL,
  jwtSecret
}
