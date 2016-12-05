const UserModel = require('../models/user.model')

/**
 * Find users
 */
const find = (filters = {}, options = {}) => UserModel
  .find(filters)
  .limit(options.limit || 20)
  .skip(options.offset || 0)
  .sort(options.sort || '-created')

module.exports = {
  find
}
