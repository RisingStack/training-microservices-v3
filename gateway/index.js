const express = require('express')

const api = require('./api')
const { serverPort } = require('./config')

const app = express()

app.use('/api', api)

const listener = app.listen(serverPort, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log('Server is listening on port http://localhost:%d', listener.address().port)
})
