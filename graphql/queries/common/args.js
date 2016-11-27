/**
 * @module graphql/queries/common/args.js
 */

const gql = require('graphql')

const sortable = ({
  defaultSortValue = '-created'
} = {}) => ({
  sort: {
    description: 'The sorting field',
    type: gql.GraphQLString,
    defaultValue: defaultSortValue
  }
})

const paginated = () => ({
  limit: {
    description: 'The max items to retrive in list',
    type: gql.GraphQLInt,
    defaultValue: 20
  },
  offset: {
    description: 'The offset of the list',
    type: gql.GraphQLInt,
    defaultValue: 0
  }
})

const paginatedAndSortable = ({
  defaultSortValue
} = {}) => Object.assign({}, paginated(), sortable({ defaultSortValue }))

module.exports = {
  paginated,
  paginatedAndSortable,
  sortable
}
