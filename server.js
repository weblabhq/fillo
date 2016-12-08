/**
 * @module server.js
 */

require('dotenv').config({
  silent: process.env.NODE_ENV === 'production'
})

// Deendecies
const express = require('express')
const graphqlHTTP = require('express-graphql')
const log = require('./logger')
const schema = require('./graphql/schema')
const mongo = require('./datastores/mongodb')
const redis = require('./datastores/redis')
const loaders = require('./loaders')
const models = require('./models')
const auth = require('./lib/auth/auth')

// Configs
const PORT = process.env.PORT || 3000

// Initializers
const app = express()
const db = mongo.connect()

// Expose DB connection
app.use((req, res, next) => {
  req.db = db
  req.cache = redis
  req.models = models
  req.log = log
  req.loaders = loaders()
  next()
})

// Allow only authenticated requests
app.use(auth)

// Graphql
app.use('/graph/v1', graphqlHTTP({
  schema,
  graphiql: true
}))

// Handle errors and log them
app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      errors: [{
        name: err.name,
        message: err.message,
        code: err.statusCode
      }]
    })
  } else {
    req.log.error(err)
  }

  return next(err)
})

// Start app
app.listen(PORT, () => {
  log.info('Server started on port', PORT)
})

module.exports = app
