'use strict'
const axios = require('axios')
const CircuitBreaker = require('circuit-breaker-js')

const breaker = new CircuitBreaker({
  onCircuitOpen() {
    console.log('CircuitBreaker is now open')
  },

  onCircuitClose() {
    console.log('CircuitBreaker is now closed')
  }
})

const circuitBreaker = (url, method = 'GET') => {
  return new Promise((resolve, reject) => {
    breaker.run((success, failed) => {
      axios({
        url: `http://${url}`,
        method
      })
        .then(response => {
          success()
          resolve(response.data)
        })
        .catch(() => {
          failed()
          reject('Error in request')
        })
    },
    () => {
      reject('Circuit breaker is active, no request is being send to DB for 10 seconds')
    })
  })
}

module.exports = {
  circuitBreaker
}
