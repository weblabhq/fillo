/**
 * @module logger.js
 *
 * Logger module powered by Pino
 */

module.exports = process.env.NODE_ENV !== 'test'
  ? require('pino')({ name: 'fillo' })
  : console
