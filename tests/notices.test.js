const request = require('supertest');
const app = require('../src/app');
const db = require('../src/models');

describe('Pruebas de Notices', () => {
  beforeAll(async () => {
    // Esperar a que la conexión esté lista
    await db.sequelize.authenticate();
    
    // Datos de prueba
    await db.notices.create({
      title: 'Test Notice',
      content: 'Test Content',
      category: 'Test',
      priority: 1
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test('GET /api/notices - Debería devolver 200', async () => {
    const response = await request(app.callback()).get('/api/notices');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
