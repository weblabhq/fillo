const DataLoader = require('dataloader')
const services = require('../services')

module.exports = () => ({
  users: {
    byId: new DataLoader(keys => services.Users.find({ id: { $in: keys } })),
    byUsername: new DataLoader(keys => services.Users.find({ username: { $in: keys } }))
  },
  containerEvents: {
    byId: new DataLoader(keys => services.ContainerEvents.find({ id: { $in: keys } })),
    byUsername: new DataLoader(keys => {
      const reqs = keys.map(k => services
        .ContainerEvents
        .find({ username: k[0] }, JSON.parse(k[1] || '{}'))
      )

      return Promise.all(reqs)
    })
  }
})
