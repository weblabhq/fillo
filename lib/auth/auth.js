/**
 * @module lib/auth/auth.js
 */

const errors = require('../errors')
const token = require('./token')

const AUTH_HEADER = 'authorization'

/**
 * Parse authorization header
 *
 * @param {String} header - Authorization header
 */
const parseAuthHeader = (header) => {
  if (typeof header !== 'string') {
    return {}
  }
  const matches = header.match(/(\S+)\s+(\S+)/)
  return matches
    ? { scheme: matches[1], value: matches[2] }
    : {}
}

/**
 * Get authorization token from header
 *
 * @param {Request} req - Restify request object
 */
const fromHeader = (req) => parseAuthHeader(req.headers[AUTH_HEADER])

/**
 * Get autorization token from query
 *
 * @param {Request} req - Restify request object
 */
const fromQuery = (req) => req.query.access_token

/**
 * Get autorization token
 *
 * @param {Request} req - Restify request object
 */
const checkAuthorization = (req) => {
  return new Promise(function (resolve, reject) {
    let header = fromHeader(req)
    let payload

    if (header.scheme) {
      if (header.scheme !== 'JWT') {
        reject(new errors.PreconditionFailed('Auth scheme not supported.'))
        return
      }

      payload = header.value
    } else {
      payload = fromQuery(req)

      if (!payload) {
        reject(new errors.PreconditionFailed('Access token not found.'))
        return
      }
    }

    token.verify(payload, function (e, decoded) {
      if (e) {
        switch (e.name) {
          case 'TokenExpiredError':
            return reject(new errors.Unauthorized('Your access token has expired. Login again to obtain a new token.'))
          default:
            req.log.error(e)
            return reject(new errors.PreconditionFailed('Invalid access token.'))
        }
      }

      resolve(decoded)
    })
  })
}

/**
 * Check if user is active. If token has *active* field set to false,
 * check if user was activated in the meantime in the DB, else user
 * is already active.
 *
 * @param {Request} req - Restify request object
 */
const checkActiveUser = (req, payload) => {
  if (payload.active) {
    return Promise.resolve(payload)
  }

  return req.models.User
    .findOne({ username: payload.username }).exec()
    .then((user) => {
      if (!user) {
        throw new errors.Unauthorized('You are not authorized to access this resource.')
      }

      if (user.active) {
        payload.active = user.active
        return Promise.resolve(payload)
      }

      return Promise.reject(new errors.Unauthorized('Your account is not yet verified. Please follow the link you\'ve received by email to verify your account.'))
    })
}

// Ensure token used is active and user from token matches the users resource accessed
const auth = (req, res, next) => {
  // Check authorization token
  checkAuthorization(req)
    // Check if active user or not
    .then((payload) => checkActiveUser(req, payload))
    // Go to next middleware
    .then(() => { next() })
    .catch((err) => {
      if (err.code && err.code !== 500) {
        next(err)
      } else {
        next(new errors.Unauthorized('You are not authorized to access this resource.'))
      }
    })
}

module.exports = auth
