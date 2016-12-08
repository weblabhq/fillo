/**
 * @module datastores/mongodb.js
 */

const mongoose = require('mongoose')
const log = require('../logger')
const config = require('../config')

// Set promise library
mongoose.Promise = global.Promise
// Enable query debug on non prod environments
mongoose.set('debug', process.env.NODE_ENV === 'development')

let db

const connect = () => {
  // Connect
  mongoose
    .connect(config.MONGO_URI)
    .catch(err => log.error(err))

  db = mongoose.connection
  const url = `${db.host}:${db.port}/${db.db.databaseName}`

  db.on('error', (err) => log.error('[MONGO]', err))
  db.once('open', () => log.info(`[MONGO] Connected to ${url}`))

  return db
}

const getConnection = () => db

module.exports = {
  connect,
  getConnection
}
