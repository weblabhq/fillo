const redis = require('redis')
const config = require('../config')
const log = require('../logger')
const client = redis.createClient(config.REDIS_URL)

client.on('error', (err) => log.error('[REDIS]', err))
client.once('ready', () => log.info('[REDIS] Connected'))

module.exports = client
