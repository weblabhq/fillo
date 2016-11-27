/**
 * @module graphql/queries/users.query.js
 */

const gql = require('graphql')
const UserType = require('../types/user.type')
const UserModel = require('../../models/user.model')
const paginatedAndSortable = require('./common/args').paginatedAndSortable

const query = {
  type: new gql.GraphQLList(UserType),
  description: 'Get a list of users',
  args: paginatedAndSortable(),
  resolve: (root, args, context) => {
    const { offset, limit, sort } = args

    return UserModel
      .find({})
      .limit(limit)
      .skip(offset)
      .sort(sort)
  }
}

module.exports = query
