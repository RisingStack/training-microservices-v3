'use strict'

const tableName = 'users'

function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id')
    table.string('username').notNullable()
    table.string('email').notNullable()
    table.string('pass').notNullable()
    table.boolean('isAdmin').defaultTo('false')
  })
}

function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}

module.exports = {
  up,
  down
}
