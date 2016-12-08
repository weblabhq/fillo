const expect = require('expect.js')
const supertest = require('supertest')

const app = require('../../server')
const token = require('../utils/token')
const init = require('../utils/init')

// Wait for server to start
before(() => init())

describe('GraphQL', () => {
  describe('/graph/v1', () => {
    it('should not allow unauthorized requests', (done) => {
      supertest(app)
        .post('/graph/v1')
        .expect(412)
        .end(done)
    })

    it('should allow authorized requests', (done) => {
      supertest(app)
        .post('/graph/v1')
        .set('Accept', 'application/json')
        .set('Authorization', `JWT ${token.getAuthToken()}`)
        .send({ query: '{ users { id } }' })
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.users.length).to.be.greaterThan(0)
          done(err)
        })
    })
  })
})
