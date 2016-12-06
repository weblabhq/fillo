/**
 * @module schema/schema.js
 */

const gql = require('graphql')
const queries = require('./queries')

const schema = new gql.GraphQLSchema({
  query: new gql.GraphQLObjectType({
    name: 'Query',
    description: 'The Weblab Root query',
    fields: () => ({
      user: queries.User,
      users: queries.Users,
      containerEvent: queries.ContainerEvent,
      containerEvents: queries.ContainerEvents()
    })
  })
})

module.exports = schema
