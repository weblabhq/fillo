/**
 * @module connectors/mongodb.js
 */

const mongoose = require('mongoose')
const log = require('pino')()

// Set promise library
mongoose.Promise = global.Promise
mongoose.set('debug', true)

const connect = () => {
  // Connect
  mongoose
    .connect(process.env.MONGODB)
    .catch(err => log.error(err))

  const db = mongoose.connection

  db.on('error', (err) => log.error('[MONGO]', err))
  db.once('open', () => log.info('[MONGO] Connected'))

  return db
}

module.exports = {
  connect
}
