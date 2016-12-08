const m = require('../../models')

const testUser = new m.User({
  username: 'test_user_32167',
  email: 'test_user_32167@test.email.com',
  plan: {
    name: 'Free',
    maxInstances: 5
  },
  active: true,
  created: new Date()
})

module.exports = () => testUser.save()
