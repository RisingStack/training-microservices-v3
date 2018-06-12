'use strict'

const tableName = 'products'

function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.text('description')
    table.text('ingredients')
    table.decimal('price').unsigned().notNullable()
    table.string('currency').notNullable()
    table.boolean('available').notNullable().defaultTo('false')
  })
}

function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}

module.exports = {
  up,
  down
}
