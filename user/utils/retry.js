// 'use strict'

// const logger = require('winston')

// function sleep(timeout) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve()
//     }, timeout)
//   })
// }

// async function retry(times, subject, ...subjectArgs) {
//   let counter = 0
//   let err

//   while (counter < times) {
//     try {
//       logger.debug(`Trying connection: ${counter}`)
//       // eslint-disable-next-line
//       return await subject(...subjectArgs)
//     } catch (ex) {
//       err = ex
//       counter += 1
//       // eslint-disable-next-line
//       await sleep(counter * 1000)
//     }
//   }

//   throw err
// }

// module.exports = retry
