const DataLoader = require('dataloader')
const ContainerEventService = require('../services/container-events.service')

module.exports = {
  byId: new DataLoader(ids => ContainerEventService.byId(ids)),
  byUsername: new DataLoader(usernames => ContainerEventService.byUsername(usernames))
}
