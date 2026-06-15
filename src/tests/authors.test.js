const request = require('supertest');
const express = require('express');
const authorsRouter = require('../routes/authors');

const app = express();
app.use(express.json());
app.use('/authors', authorsRouter);

describe('Authors API', () => {
  test('GET /authors debe retornar lista de autores', async () => {
    const res = await request(app).get('/authors');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /authors/:id debe retornar un autor existente', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  test('GET /authors/:id debe retornar 404 si no existe', async () => {
    const res = await request(app).get('/authors/9999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /authors debe crear un autor nuevo', async () => {
    const res = await request(app).post('/authors').send({
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      bio: 'Bio de prueba',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test User');
  });

  test('POST /authors debe retornar 400 si falta name o email', async () => {
    const res = await request(app).post('/authors').send({ bio: 'Solo bio' });
    expect(res.statusCode).toBe(400);
  });
});
