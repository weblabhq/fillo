const DataLoader = require('dataloader')
const ContainerEventService = require('../services/container-events.service')
const UserService = require('../services/users.service')

module.exports = () => ({
  users: {
    byId: new DataLoader(keys => UserService.find({ id: { $in: keys } })),
    byUsername: new DataLoader(keys => UserService.find({ username: { $in: keys } }))
  },
  containerEvents: {
    byId: new DataLoader(keys => ContainerEventService.find({ id: { $in: keys } })),
    byUsername: new DataLoader(keys => ContainerEventService.find({ username: { $in: keys } }))
  }
})
