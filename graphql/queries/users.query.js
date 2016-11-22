/**
 * @module graphql/queries/users.query.js
 */

const gql = require('graphql')
const UserType = require('../types/user.type')
const UserModel = require('../../models/user.model')

const query = {
  type: new gql.GraphQLList(UserType),
  args: {
    id: {
      name: 'The user id',
      type: gql.GraphQLString
    }
  },
  resolve: (root, args, context) => {
    return UserModel.find(args)
  }
}

module.exports = query
