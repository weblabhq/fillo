const ContainerEventModel = require('../models/container-event.model')

const byId = (id) => ContainerEventModel.find({ id })
const byUsername = (username) => ContainerEventModel.find({ username })

module.exports = {
  byId,
  byUsername
}
