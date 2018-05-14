const express = require('express')

const api = require('./api')
const { serverPort, productsAPIURL, usersAPIURL } = require('./config')

const app = express()

app.use('/api', api)

const listener = app.listen(serverPort, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(
    'Server is listening on port http://localhost:%d',
    listener.address().port
  )
  console.log('Server will be looking for productService at %s', productsAPIURL)
  console.log('Server will be looking for userService at %s', usersAPIURL)
})
