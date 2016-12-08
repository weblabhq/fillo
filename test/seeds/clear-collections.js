const mongo = require('../../datastores/mongodb')

module.exports = () => new Promise((resolve, reject) => {
  const connection = mongo.getConnection()

  if (connection.db.databaseName !== 'test') {
    throw new Error('Not a test database!')
  }

  connection.db
    .listCollections({ name: 'users' })
    .next((err, collinfo) => {
      if (err) return reject(err)

      if (collinfo) {
        // The collection exists
        return connection.collections.users.drop((err) => {
          err ? reject(err) : resolve()
        })
      }

      return resolve()
    })
})
