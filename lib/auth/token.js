/**
 * @module lib/auth/token.js
 */

const config = require('../../config')
const jwt = require('jsonwebtoken')

const verify = (payload, opts, cb) => jwt.verify(payload, config.JWT_SECRET, opts, cb)
const decode = jwt.decode

module.exports = {
  decode,
  verify
}
