const clearCollections = require('../seeds/clear-collections')
const createTestUser = require('../seeds/create-test-user')

const init = () => {
  const delay = new Promise((resolve) => setTimeout(resolve, 1000))
  return delay.then(() => Promise.all([
    clearCollections(),
    createTestUser()
  ]))
}

module.exports = init
