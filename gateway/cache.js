const { promisify } = require('util')
const axios = require('axios')
const redisClient = require('./config').redisClient

const getCache = promisify(redisClient.get).bind(redisClient)
const setCache = promisify(redisClient.set).bind(redisClient)

const cacheMiddleware = async (req, res, next) => {
  const data = await getCache('productlist')

  if (data !== null) {
    res.send(JSON.parse(data))
    return
  } else {
    next()
  }
}

const updateCache = async (proxyRes, proxyResData, userReq, userRes) => {
  const updatedList = proxyResData.toString('utf8')

  await setCache('productlist', updatedList)
  return proxyResData
}

const requestWithCache = async (url, method = 'GET') => {
  const productId = url.split('/').pop()
  const cacheKey = `product-${productId}`
  const cachedProduct = await getCache(cacheKey)

  if (cachedProduct !== null) {
    return JSON.parse(cachedProduct)
  }

  try {
    const { data } = await axios({
      method,
      url: `http://${url}`
    })

    await setCache(cacheKey, JSON.stringify(data))

    return data
  } catch (error) {
    console.error(error)
    throw err
  }
}

module.exports = {
  cacheMiddleware,
  updateCache,
  requestWithCache
}
