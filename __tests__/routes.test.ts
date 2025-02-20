import server from "../src";


describe('GET /docs', () => {

  afterAll(async () => {
    server.closeAllConnections()
    server.close()
  })

  it('should return 200', async () => {
    const res = await fetch('http://localhost:3000/docs')
    expect(res.status).toBe(200);
  })
});