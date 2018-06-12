// 'use strict'

// const logger = require('winston')
// // const knex = require('../models/db/')
// // const { generateProducts } = require('./generate-seed')
// const retry = require('./retry')
// // const { hashPass } = require('./hashPass')

// async function checkConnection(knex) {
//   try {
//     await retry(10, knex.select.bind(knex.select), { criteria: 1 })
//     logger.info('DB connection is ready')
//     return
//   } catch (err) {
//     logger.error(err)
//     throw err
//   }
// }

// async function migrateDB(knex) {
//   await knex.migrate.latest()
//     .then(() => {
//       // eslint-disable-next-line no-console
//       logger.info('DB is synched')
//     })
//     .catch((err) => {
//       // eslint-disable-next-line no-console
//       logger.error(err)
//       throw err
//     })
// }

// async function clearDB(knex) {
//   try {
//     await knex.migrate.rollback()
//     logger.debug('Database is cleared')
//     return
//   } catch (err) {
//     logger.error('Cannot drop the base')
//     throw err
//   }
// }

// // async function seedDB() {
// //   try {
// //     await seedProducts(20)
// //     await seedAdmin()
// //     await seedUser()
// //     return
// //   } catch (err) {
// //     logger.error(err)
// //     throw err
// //   }
// // }

// // async function checkDBContent() {
// //   try {
// //     const result = await knex('products').first()
// //     if (result) {
// //       return false
// //     }
// //     return true
// //   } catch (err) {
// //     throw err
// //   }
// // }

// module.exports = {
//   checkConnection,
//   migrateDB,
//   // seedDB,
//   clearDB,
//   // checkDBContent
// }
