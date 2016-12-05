module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  REDIS_URL: process.env.REDIS_URL,
  // 5 mins (300 seconds)
  CACHE_EXPIRE_TIME: process.env.CACHE_EXPIRE_TIME || 5 * 60,
  JWT_SECRET: process.env.JWT_SECRET
}
