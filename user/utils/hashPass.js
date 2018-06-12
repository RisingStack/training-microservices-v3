'use strict'

const bcrypt = require('bcrypt')
const logger = require('winston')

async function hashPass(valueToHash) {
  const rounds = 10

  try {
    const hashedValue = await bcrypt.hash(valueToHash, rounds)
    return hashedValue
  } catch (err) {
    logger.error(err)
    throw err
  }
}

module.exports = {
  hashPass
}
