/**
 * @module graphql/queries/containter-event.query.js
 */

const gql = require('graphql')
const ContainerEventType = require('../types/container-event.type')
const ContainerEventModel = require('../../models/container-event.model')

const query = {
  type: ContainerEventType,
  description: 'Get details for a single container event',
  args: {
    id: {
      name: 'The containter id',
      type: new gql.GraphQLNonNull(gql.GraphQLString)
    }
  },
  resolve: (root, { id }, context) => ContainerEventModel.findById(id)
}

module.exports = query
