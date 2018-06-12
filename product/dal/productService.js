'use strict'

const db = require('../db')

const tableName = 'products'

const ProductService = {
  getAllProducts() {
    return db(tableName)
      .select()
      .orderBy('id', 'asc')
      .then((result) => result)
  },

  getProductByID(id) {
    return db(tableName)
      .where({ id })
      .then((result) => result)
  },

  getProductsBySearch(searchString) {
    return db(tableName)
      .where('name', 'ILIKE', `%${searchString}%`)
      .orWhere('description', 'ILIKE', `%${searchString}%`)
      .orWhere('ingredients', 'ILIKE', `%${searchString}%`)
      .then((result) => result)
  },

  insertProduct(newProduct) {
    return db(tableName)
      .insert(newProduct)
      .returning('*')
      .then((result) => result[0])
  },

  edit(id, update) {
    return db(tableName)
      .where({ id })
      .update(update)
      .returning('*')
      .then((result) => result[0])
  },

  delete(id) {
    return db(tableName)
      .where({ id })
      .delete()
  }
}

module.exports = ProductService
