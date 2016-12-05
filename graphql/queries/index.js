/**
 * @module graphql/queries/index
 */

const load = require('../../lib/utilities').load

module.exports = load({
  dir: __dirname,
  extension: '.query.js'
})
