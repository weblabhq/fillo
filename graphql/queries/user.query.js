/**
 * @module graphql/queries/user.query.js
 */

const gql = require('graphql')
const UserType = require('../types/user.type')
const UserModel = require('../../models/user.model')

const query = {
  type: UserType,
  args: {
    id: {
      name: 'The user id',
      type: new gql.GraphQLNonNull(gql.GraphQLString)
    }
  },
  resolve: (root, { id }, context) => UserModel.findById(id)
}

module.exports = query
