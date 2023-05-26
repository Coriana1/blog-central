'use strict';

const { app } = require('../index');
const { db } = require('../src/models');
const supertest = require('supertest');

const request = supertest(app);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Non-auth Routes', () => {
  // Test routes that do not require authentication

  test('proof of life', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
  });
  
  test('404 on bad route', async () => {
    const response = await request.get('/foo');
    expect(response.status).toEqual(404);
  });
  
  test('404 on bad method', async () => {
    const response = await request.post('/');
    expect(response.status).toEqual(404);
  });

  test('/api/v1 blog posts READ ALL', async () => {
    const response = await request.get('/api/v1/blog-posts');
    expect(response.status).toEqual(200);
  });

  test('/api/v1 blog posts CREATE', async () => {
    const response = await request.post('/api/v1/blog-posts').send({
      author: 'John Doe',
      title: 'Sample Blog Post',
      content: 'This is a sample blog post.',
      date: new Date(),
      image: 'sample.jpg',
    });
    expect(response.status).toEqual(201);
  });

  test('/api/v1 blog posts READ ONE', async () => {
    const response = await request.get('/api/v1/blog-posts/1');
    expect(response.status).toEqual(200);
  });

  test('/api/v1 blog posts UPDATE', async () => {
    const response = await request.put('/api/v1/blog-posts/1').send({
      author: 'Jane Smith',
      title: 'Updated Blog Post',
      content: 'This is an updated blog post.',
      date: new Date(),
      image: 'updated.jpg',
    });
    expect(response.status).toEqual(200);
  });

  test('/api/v1 blog posts DELETE', async () => {
    const response = await request.delete('/api/v1/blog-posts/1');
    expect(response.status).toEqual(200);
  });
});

describe('Auth Routes', () => {

  // Test routes that do not require authentication
  test('/api/v2 blog posts READ ALL', async () => {
    const response = await request.get('/api/v2/blog-posts').set('Authorization', 'Bearer YOUR_TOKEN');
    expect(response.status).toEqual(200);
  });

  test('/api/v2 blog posts CREATE', async () => {
    const response = await request.post('/api/v2/blog-posts').send({
      author: 'John Doe',
      title: 'Sample Blog Post',
      content: 'This is a sample blog post.',
      date: new Date(),
      image: 'sample.jpg',
    }).set('Authorization', 'Bearer YOUR_TOKEN');
    expect(response.status).toEqual(201);
  });

  test('/api/v2 blog posts READ ONE', async () => {
    const response = await request.get('/api/v2/blog-posts/1').set('Authorization', 'Bearer YOUR_TOKEN');
    expect(response.status).toEqual(200);
  });

  test('/api/v2 blog posts UPDATE', async () => {
    const response = await request.put('/api/v2/blog-posts/1').send({
      author: 'Jane Smith',
      title: 'Updated Blog Post',
      content: 'This is an updated blog post.',
      date: new Date(),
      image: 'updated.jpg',
    }).set('Authorization', 'Bearer YOUR_TOKEN');
    expect(response.status).toEqual(200);
  });

  test('/api/v2 blog posts DELETE', async () => {
    const response = await request.delete('/api/v2/blog-posts/1').set('Authorization', 'Bearer YOUR_TOKEN');
    expect(response.status).toEqual(200);
  });
});
