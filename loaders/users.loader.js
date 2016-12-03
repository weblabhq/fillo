const DataLoader = require('dataloader')
const UserService = require('../services/users.service')

module.exports = {
  byId: new DataLoader(ids => UserService.byId(ids)),
  byUsername: new DataLoader(usernames => UserService.byUsername(usernames))
}
