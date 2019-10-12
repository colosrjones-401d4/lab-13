'use strict';

process.env.SECRET='test';  

const jwt = require('jsonwebtoken');
const server = require('../../../src/app.js').server;
const supergoose = require('../../supergoose.js');

const mockRequest = supergoose.server(server);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Lab 13: Authorization Bearer', () => {

  it('should let a user log in (with a good token) and receive a new token', () => {
    return mockRequest.post('/signup')
      .send({username: 'newtoken', password: 'pass'})
      .then(results => {
        return mockRequest.post('/signin')
          .set('Authorization', 'Bearer ' + results.header.token)
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.text).toBeDefined();
          })
      })
  });

  it('tokens can be optionally expired; should not permit tokens when they are expired', () => {
    process.env.TOKEN_TIMEOUT = 1;

    return mockRequest.post('/signup')
      .send({username: 'expiredToken', password: 'pass'})
      .then(results => {
        return mockRequest.post('/signin')
          .set('Authorization', 'Bearer ' + results.header.token)
          .then(res => {
            expect(res.status).toBe(500);
            expect(/error/.test(res.text)).toBeTruthy();
          })
      })
  });

  it('should only allow for one-time use of the same token', () => {
    return mockRequest.post('/signup')
      .send({username: 'oneUseToken', password: 'pass'})
      .then(results => {
        return mockRequest.post('/signin')
          .set('Authorization', 'Bearer ' + results.header.token)
          .then(() => {
            return mockRequest.post('/signin')
              .set('Authorization', 'Bearer ' + results.header.token)
              .then(res => {
                expect(res.status).toBe(500);
                expect(/error/.test(res.text)).toBeTruthy();
              })
          })
      })
  });


  it('should allow a user to log in with an auth key', () => {
    return mockRequest.post('/key')
      .send({username: 'authKeyTest', password: 'pass'})
      .then(results => {
        return mockRequest.post('/signin')
          .set('Authorization', 'Bearer ' + results.header.token)
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.text).toBeDefined();
          })
      })
  });

  it('auth keys should not expire and are reusable', () => {
    return mockRequest.post('/key')
      .send({username: 'authKeyReusable', password: 'pass'})
      .then(results => {
        return mockRequest.post('/signin')
          .set('Authorization', 'Bearer ' + results.header.token)
          .then(() => {
            return mockRequest.post('/signin')
              .set('Authorization', 'Bearer ' + results.header.token)
              .then((res) => {
                expect(res.status).toBe(200);
                expect(res.text).toBeDefined();
              })
          })
      })
  });
});