import server from "../src";
import { SequelizeDBSingleton } from "../src/config/dbsetup";


describe('GET /docs', () => {

  afterAll(async () => {
    await SequelizeDBSingleton.getInstance().close();
    server.closeAllConnections()
    server.close()
  })
  it('should return 200', async () => {
    // Arrange
    const res = await fetch('http://localhost:3000/docs')
    expect(res.status).toBe(200);
    // Act
    // Assert
  })
});