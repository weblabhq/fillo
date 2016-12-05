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
  req.loaders = loaders()
  next()
})
// Graphql
app.use('/graph/v1', graphqlHTTP({
  schema,
  graphiql: true
}))

// Start app
app.listen(PORT, () => {
  log.info('Server started on port', PORT)
})
