const request = require('supertest');
const express = require('express');
const postsRouter = require('../routes/posts');

const app = express();
app.use(express.json());
app.use('/posts', postsRouter);

describe('Posts API', () => {
  test('GET /posts debe retornar lista de posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /posts/:id debe retornar un post existente', async () => {
    const res = await request(app).get('/posts/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  test('GET /posts/:id debe retornar 404 si no existe', async () => {
    const res = await request(app).get('/posts/9999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /posts debe crear un post nuevo', async () => {
    const res = await request(app).post('/posts').send({
      title: 'Post de prueba',
      content: 'Contenido de prueba',
      author_id: 1,
      published: false,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Post de prueba');
  });

  test('POST /posts debe retornar 400 si falta title, content o author_id', async () => {
    const res = await request(app).post('/posts').send({ title: 'Solo título' });
    expect(res.statusCode).toBe(400);
  });

  test('POST /posts debe retornar 400 si author_id no existe', async () => {
    const res = await request(app).post('/posts').send({
      title: 'Post inválido',
      content: 'Contenido',
      author_id: 9999,
    });
    expect(res.statusCode).toBe(400);
  });
});
