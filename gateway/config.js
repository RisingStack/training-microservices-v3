const {
  PORT: serverPort,
  PRODUCTS_API_URL: productsAPIURL = 'http://localhost:3001',
  USERS_API_URL: usersAPIURL = 'http://localhost:3002',
  JWT_SECRET: jwtSecret
} = process.env

module.exports = {
  serverPort,
  productsAPIURL,
  usersAPIURL,
  jwtSecret
}
