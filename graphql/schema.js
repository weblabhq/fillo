/**
 * @module schema/schema.js
 */

const gql = require('graphql')
const queries = require('./queries')

const schema = new gql.GraphQLSchema({
  query: new gql.GraphQLObjectType({
    name: 'RootQuery',
    description: 'The root query description',
    fields: {
      user: queries.UserQuery,
      users: queries.UsersQuery,
      containerEvent: queries.ContainerEventQuery,
      containerEvents: queries.ContainerEventsQuery
    }
  })
})

module.exports = schema
