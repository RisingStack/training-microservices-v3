const { promisify } = require('util')
const { redisClient } = require('./config')

const getCache = promisify(redisClient.get).bind(redisClient)
const setCache = promisify(redisClient.set).bind(redisClient)

const cacheMiddleware = async (ctx, next) => {
  const cacheKey = `${ctx.request.method}${ctx.request.url}`
  const cachedData = await getCache(cacheKey)

  if (cachedData !== null) {
    console.log('[CACHE]: Sending back the cached data')
    ctx.body = JSON.parse(cachedData)
    return
  }

  try {
    await next()
    await setCache(cacheKey, JSON.stringify(ctx.body))
    console.log('[CACHE]: The updated data is saved to the cache')
  } catch (error) {
    console.error('[CACHE]: An error happened in one of the next middlewares')
    ctx.throw(500)
  }
}

module.exports = cacheMiddleware
