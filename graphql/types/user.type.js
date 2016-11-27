/**
 * @module schema/types/user.type.js
 */

const gql = require('graphql')
const PlanType = require('./plan.type')

module.exports = new gql.GraphQLObjectType({
  name: 'User',
  description: 'A registred user',
  fields () {
    return {
      id: {
        type: new gql.GraphQLNonNull(gql.GraphQLString),
        description: 'Unique identifier of the user'
      },
      username: {
        type: new gql.GraphQLNonNull(gql.GraphQLString),
        description: 'The username'
      },
      email: {
        type: new gql.GraphQLNonNull(gql.GraphQLString),
        description: 'The email of the user'
      },
      plan: {
        type: PlanType,
        description: 'The user\'s current plan'
      },
      active: {
        type: gql.GraphQLBoolean,
        defaultValue: false,
        description: 'Flag signaling if the user is activated or not'
      },
      created: {
        type: gql.GraphQLString,
        description: 'Date of creation'
      },
      updated: {
        type: gql.GraphQLString,
        description: 'Date of last update'
      }
    }
  }
})
