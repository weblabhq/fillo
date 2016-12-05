/**
 * @module schema/types/user.type.js
 */

const gql = require('graphql')
const types = require('./index')
const paginatedAndSortable = require('../queries/common/args').paginatedAndSortable
const containerEventsService = require('../../services/container-events.service')

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
        type: types.Plan,
        description: 'The user\'s current plan'
      },
      active: {
        type: gql.GraphQLBoolean,
        defaultValue: false,
        description: 'Flag signaling if the user is activated or not'
      },
      containerEvents: {
        type: new gql.GraphQLList(require('./container-event.type')),
        description: 'Get the list of container events for the user',
        args: paginatedAndSortable({ limit: 5 }),
        resolve: (root, args, ctx) => containerEventsService.find({ username: root.username }, args)
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
