'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('winston')
const UserService = require('../dal/userService')
const config = require('../config/server')

const UserLogin = {
  async login(ctx) {
    const loginCredentials = {
      email: ctx.request.body.email,
      password: ctx.request.body.pass
    }

    try {
      const result = await UserService.getLogin(loginCredentials.email)
      if (!result) {
        ctx.status = 401
        return
      }
      const isPasswordValid = await bcrypt.compare(loginCredentials.password, result.pass)
      if (!isPasswordValid) {
        ctx.status = 401
        return
      }
      const token = jwt.sign({ id: result.id, isAdmin: result.isAdmin }, config.tokenSecret, {
        expiresIn: config.tokenExpiration
      })
      ctx.body = {
        token,
        message: 'Successfully logged in',
        user: {
          username: result.username,
          email: result.email,
          admin: result.isAdmin
        }
      }
      return
    } catch (err) {
      logger.error(err)
      ctx.status = 500
    }
  }
}

module.exports = {
  login: UserLogin.login
}
