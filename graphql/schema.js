/**
 * @module schema/schema.js
 */

const gql = require('graphql')

const user = require('./queries/user.query')
const users = require('./queries/users.query')

const schema = new gql.GraphQLSchema({
  query: new gql.GraphQLObjectType({
    name: 'RootQuery',
    description: 'The root query description',
    fields: {
      user,
      users
    }
  })
})

module.exports = schema
