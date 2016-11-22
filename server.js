/**
 * @module server.js
 */

require('dotenv').config()

// Deendecies
const express = require('express')
const pino = require('pino')
const graphqlHTTP = require('express-graphql')
const schema = require('./graphql/schema')
const mongo = require('./datastores/mongodb')

// Configs
const PORT = process.env.PORT || 3000

// Initializers
const log = pino()
const app = express()
const db = mongo.connect()

// Expose DB connection
app.use((req, res, next) => {
  req.db = db
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
