import app from "../src";
import request from 'supertest'

describe('GET /docs', () => {

  it('should return 200', async () => {
    const response = await request(app).get('/docs/')
    expect(response.status).toBe(200);
  })
});

describe('POST /auth/login', () => {

  it('missing credentials should return 400', async () => {
    const missingCredentials = {
      username: '',
      password: ''
    }
    const response = await request(app)
      .post('/auth/login')
      .send(missingCredentials)
    expect(response.status).toBe(400);
  })

  it('invalid credentials should return 401', async () => {
    const invalidCredentials = {
      username: 'invalid',
      password: 'invalid'
    }
    const response = await request(app)
      .post('/auth/login')
      .send(invalidCredentials)
    expect(response.status).toBe(401);
  })

  it('valid credentials should return 200', async () => {
    const validCredentials = {
      username: 'johndoe',
      password: 'password'
    }
    const response = await request(app)
      .post('/auth/login')
      .send(validCredentials)
    expect(response.status).toBe(200);
  })
})