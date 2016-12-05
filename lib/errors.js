/**
 * @module lib/errors.js
 */

const CODES = {
  PreconditionFailed: 412,
  Unauthorized: 401
}

module.exports = Object.keys(CODES)
  .reduce((errors, name) => {
    const code = CODES[name]

    errors[name] = function (message) {
      this.displayName = name
      this.message = message || ''
      Error.captureStackTrace(this, errors[name])
    }

    errors[name].prototype = Object.create(Error.prototype)
    errors[name].prototype.name = name
    errors[name].prototype.code = code
    errors[name].prototype.constructor = errors[name]

    return errors
  }, {})
