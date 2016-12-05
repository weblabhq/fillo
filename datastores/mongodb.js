/**
 * @module connectors/mongodb.js
 */

const mongoose = require('mongoose')
const log = require('../logger')
const config = require('../config')

// Set promise library
mongoose.Promise = global.Promise
mongoose.set('debug', process.env.NODE_ENV === 'development')

const connect = () => {
  // Connect
  mongoose
    .connect(config.MONGO_URI)
    .catch(err => log.error(err))

  const db = mongoose.connection

  db.on('error', (err) => log.error('[MONGO]', err))
  db.once('open', () => log.info('[MONGO] Connected'))

  return db
}

module.exports = {
  connect
}
