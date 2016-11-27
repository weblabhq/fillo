/**
 * @module graphql/queries/container-events.query.js
 */

const gql = require('graphql')
const ContainerEventType = require('../types/container-event.type')
const ContainerEventModel = require('../../models/container-event.model')
const paginatedAndSortable = require('./common/args').paginatedAndSortable

const query = {
  type: new gql.GraphQLList(ContainerEventType),
  description: 'Get a list of container events',
  args: paginatedAndSortable(),
  resolve: (root, args, context) => {
    const { offset, limit, sort } = args

    return ContainerEventModel
      .find({})
      .limit(limit)
      .skip(offset)
      .sort(sort)
  }
}

module.exports = query
