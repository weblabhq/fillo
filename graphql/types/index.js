/**
 * @module graphql/types/index
 */

const load = require('../../lib/utilities').load

module.exports = load({
  dir: __dirname,
  extension: '.type.js'
})
