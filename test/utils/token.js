const config = require('../../config')
const jwt = require('jsonwebtoken')

const sign = (payload, opts = {}, cb) => {
  opts.issuer = opts.issuer || config.JWT_ISSUER
  opts.expiresIn = opts.expiresIn || '7d'

  return jwt.sign(payload, config.JWT_SECRET, opts, cb)
}

const getAuthToken = () => {
  return sign({
    username: 'test_user',
    plan: {
      name: 'Free',
      maxInstances: 5
    },
    active: true
  })
}

module.exports = {
  getAuthToken,
  sign
}
