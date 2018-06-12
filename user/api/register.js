'use strict'

const logger = require('winston')
const UserService = require('../dal/userService')
const { hashPass } = require('../utils/hashPass')

const UserRegister = {
  async register(ctx) {
    try {
      const credentials = {
        username: ctx.request.body.username,
        email: ctx.request.body.email,
        pass: await hashPass(ctx.request.body.pass)
      }
      await UserService.insert(credentials)
      ctx.body = {
        message: 'User successfully registered'
      }
      ctx.status = 201
    } catch (err) {
      logger.error(err)
      ctx.status = 500
    }
  }
}

module.exports = {
  register: UserRegister.register
}
