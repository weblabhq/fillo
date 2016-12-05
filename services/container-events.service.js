const ContainerEventModel = require('../models/container-event.model')

/**
 * Find container events
 */
const find = (filters = {}, options = {}) => ContainerEventModel
  .find(filters)
  .limit(options.limit || 20)
  .skip(options.offset || 0)
  .sort(options.sort || '-created')

module.exports = {
  find
}
