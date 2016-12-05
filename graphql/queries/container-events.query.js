/**
 * @module graphql/queries/container-events.query.js
 */

const gql = require('graphql')
const paginatedAndSortable = require('./common/args').paginatedAndSortable
const containerEventsService = require('../../services/container-events.service')

const query = () => ({
  type: new gql.GraphQLList(require('../types/container-event.type')),
  description: 'Get a list of container events',
  args: paginatedAndSortable(),
  resolve: (root, args, ctx) => containerEventsService.find({}, args)
})

module.exports = query
