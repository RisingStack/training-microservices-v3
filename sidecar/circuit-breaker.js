'use strict'
const CircuitBreaker = require('circuit-breaker-js')

const breaker = new CircuitBreaker({
  onCircuitOpen() {
    console.log('CircuitBreaker is now open')
  },

  onCircuitClose() {
    console.log('CircuitBreaker is now closed')
  }
})

const circuitBreaker = async (ctx, next) => {
  // Needs a promise so the response will be handled by Koa only when everything is set
  // with resolving the promise, Koa will send the response, since this is our last middleware in line
  return new Promise((resolve, reject) => {
    breaker.run(async (success, failed) => {
      console.log('[CB] This is the circuit breaker middleware')

      try {
        await next()
        console.log('[CB] All the other middleware has been run, sending back the response')
        success()
        resolve()
      } catch (error) {
        console.error('[CB] Circuit breaker got an error', error)
        ctx.status = 500
        failed()
        resolve()
      }
    },

    () => {
      console.error('[CB] Circuit breaker is active, no request is being send to DB for 10 seconds')
      ctx.status = 500
      ctx.message = 'Circuit breaker is active, no requests will be handled for 10 seconds'
      resolve()
    })

  })
}

module.exports = circuitBreaker
