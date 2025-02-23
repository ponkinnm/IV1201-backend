import server from "../src";
import request from 'supertest'

afterAll(async () => {
  server.closeAllConnections()
  server.close()
})

describe('GET /docs', () => {

  it('should return 200', async () => {
    const response = await request(server).get('/docs/')
    expect(response.status).toBe(200);
  })
});