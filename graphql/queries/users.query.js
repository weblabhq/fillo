/**
 * @module graphql/queries/users.query.js
 */

const gql = require('graphql')
const UserType = require('../types/user.type')
const paginatedAndSortable = require('./common/args').paginatedAndSortable
const usersService = require('../../services/users.service')

const query = {
  type: new gql.GraphQLList(UserType),
  description: 'Get a list of users',
  args: paginatedAndSortable(),
  resolve: (root, args, ctx) => usersService.find({}, args)
}

module.exports = query
