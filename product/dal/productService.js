'use strict'

const db = require('../db')

const tableName = 'products'

const ProductService = {
  getAllProducts() {
    return db(tableName)
      .select()
      .orderBy('id', 'asc')
      .then((result) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(result)
          }, 3000);
        })
      })
  },

  getProductByID(id) {
    return db(tableName)
      .where({ id })
      .then((result) => {
        if (result[0].id === 2) {
          console.log('Sending back data')
          return result
        }
        console.log('Rejecting call')
        Promise.reject()
      })
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
