const axios = require('axios')
const { appPort } = require('./config')

const proxyMiddleware = async (ctx, next) => {
  try {
    console.log('[PROXY] Sending the request to app:', `http://localhost:${appPort}${ctx.request.path}`)
    const response = await axios({
      method: ctx.request.method,
      url: `http://localhost:${appPort}${ctx.request.path}`
    })
    ctx.body = response.data
    console.log('[PROXY] The response body has been updated')
  } catch (error) {
    console.error('[PROXY] Error in the request')
    ctx.throw(500)
  }
}

module.exports = proxyMiddleware