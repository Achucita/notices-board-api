const request = require('supertest');
const app = require('../src/app');

describe('Pruebas básicas', () => {
  test('Debería responder en /api/notices', async () => {
    const response = await request(app).get('/api/notices');
    expect(response.statusCode).toBe(200);
  });
});
