/**
 * @module schema/types/user.type.js
 */

const gql = require('graphql')

module.exports = new gql.GraphQLObjectType({
  name: 'Plan',
  description: 'A subscription plan',
  fields () {
    return {
      name: {
        type: gql.GraphQLString,
        defaultValue: 'Free',
        description: 'The subscription plan name'
      },
      maxInstances: {
        type: gql.GraphQLInt,
        defaultValue: 5,
        description: 'The max number of instances a user can spawn'
      }
    }
  }
})
