const UserModel = require('../models/user.model')

const byId = (id) => UserModel.find({ id })
const byUsername = (username) => UserModel.find({ username })

module.exports = {
  byId,
  byUsername
}
