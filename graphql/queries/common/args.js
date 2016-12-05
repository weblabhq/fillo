/**
 * @module graphql/queries/common/args.js
 */

const gql = require('graphql')

const sortable = ({
  sort = '-created'
} = {}) => ({
  sort: {
    description: `The sorting field and direction. Default is '\`${sort}\`'`,
    type: gql.GraphQLString,
    defaultValue: sort
  }
})

const paginated = ({
  limit = 20
}) => ({
  limit: {
    description: `The max items to retrive in list. Default is '\`${limit}\`'`,
    type: gql.GraphQLInt,
    defaultValue: limit
  },
  offset: {
    description: 'The offset of the list',
    type: gql.GraphQLInt,
    defaultValue: 0
  }
})

const paginatedAndSortable = ({
  sort,
  limit
} = {}) => Object.assign({}, paginated({ limit }), sortable({ sort }))

module.exports = {
  paginated,
  paginatedAndSortable,
  sortable
}
