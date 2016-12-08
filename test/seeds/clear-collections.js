const mongo = require('../../datastores/mongodb')

module.exports = () => new Promise((resolve, reject) => {
  const connection = mongo.getConnection()

  if (connection.db.databaseName !== 'test') {
    throw new Error('Not a test database!')
  }

  mongo.getConnection().collections.users.drop((err) => {
    err ? reject(err) : resolve()
  })
})
