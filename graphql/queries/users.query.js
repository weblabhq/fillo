/**
 * @module graphql/queries/users.query.js
 */

const gql = require('graphql')
const UserType = require('../types/user.type')
const UserModel = require('../../models/user.model')

const query = {
  type: new gql.GraphQLList(UserType),
  description: 'Get a list of users',
  args: {
    limit: {
      description: 'The max users to retrive in list',
      type: gql.GraphQLInt,
      defaultValue: 20
    },
    offset: {
      description: 'The offset of the list',
      type: gql.GraphQLInt,
      defaultValue: 0
    },
    sort: {
      description: 'The sorting field',
      type: gql.GraphQLString,
      defaultValue: '-created'
    }
  },
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
