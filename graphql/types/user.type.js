/**
 * @module schema/types/user.type.js
 */

const gql = require('graphql')

const UserType = new gql.GraphQLObjectType({
  name: 'UserType',
  description: 'A registred user',
  fields () {
    return {
      id: {
        type: new gql.GraphQLNonNull(gql.GraphQLString)
      },
      username: {
        type: new gql.GraphQLNonNull(gql.GraphQLString)
      },
      email: {
        type: new gql.GraphQLNonNull(gql.GraphQLString)
      },
      plan: {
        type: new gql.GraphQLObjectType({
          name: 'plan',
          fields () {
            return {
              name: {
                type: gql.GraphQLString,
                defaultValue: 'Free'
              },
              maxInstances: {
                type: gql.GraphQLInt,
                defaultValue: 5
              }
            }
          }
        })
      },
      active: {
        type: gql.GraphQLBoolean,
        defaultValue: false
      },
      created: { type: gql.GraphQLString },
      updated: { type: gql.GraphQLString }
    }
  }
})

module.exports = UserType
