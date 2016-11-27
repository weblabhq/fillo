/**
 * @module graphql/queries/index
 */

const load = require('../../lib/utilities').load

module.exports = load({
  dir: __dirname,
  sufix: 'Query',
  extension: '.query.js'
})
