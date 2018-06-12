'use strict'

const config = require('./config/db')
const knex = require('knex')

module.exports = knex(config)
