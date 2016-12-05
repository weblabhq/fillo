/**
 * @module schema/schema.js
 */

const gql = require('graphql')
const queries = require('./queries')

const schema = new gql.GraphQLSchema({
  query: new gql.GraphQLObjectType({
    name: 'RootQuery',
    description: 'The root query description',
    fields: () => ({
      user: queries.User,
      users: queries.Users,
      containerEvent: queries.ContainerEvent,
      containerEvents: queries.ContainerEvents()
    })
  })
})

module.exports = schema
