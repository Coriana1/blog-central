'use strict';

const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/server');

const SECRET = process.env.SECRET || 'secretstring';
const request = supertest(app.server);
let userToken, adminToken, userId, adminId;

function getToken(user) {
  return jwt.sign({ username: user.username }, SECRET);
}

beforeAll(async () => {
  const user = await app.users.create({
    username: 'testUser',
    password: 'testPassword',
    role: 'user',
  });

  const admin = await app.users.create({
    username: 'testAdmin',
    password: 'testPassword',
    role: 'admin',
  });

  userToken = getToken(user);
  adminToken = getToken(admin);
  userId = user.id;
  adminId = admin.id;
});

describe('Auth Routes', () => {
  test('should allow admin to read all users', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`);
  
    expect(response.status).toEqual(200);
  });
  
  test('should not allow user to read all users', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${userToken}`);
  
    expect(response.status).toEqual(403);
  });
  
  test('should allow admin to update a user', async () => {
    const response = await request
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        username: 'UpdatedUser',
        password: 'UpdatedPassword',
        role: 'user',
      });
  
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('UpdatedUser');
  });
  
  test('should not allow user to update another user', async () => {
    const response = await request
      .put(`/users/${adminId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        username: 'IllegalUpdate',
        password: 'IllegalPassword',
        role: 'admin',
      });
  
    expect(response.status).toEqual(403);
  });
  
  test('should not allow user to delete a user', async () => {
    const response = await request
      .delete(`/users/${adminId}`)
      .set('Authorization', `Bearer ${userToken}`);
  
    expect(response.status).toEqual(403);
  });
  
  test('should allow admin to delete a user', async () => {
    const response = await request
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);
  
    expect(response.status).toEqual(200);
  });
});



// ***PREVIOUS CODE ***
// describe('V2 Routes', () => {
//   test('should allow admin to create a blog post', async () => {
//     const response = await request
//       .post('/api/v2/blog-posts')
//       .set('Authorization', `Bearer ${adminToken}`)
//       .send({
//         author: 'testAdmin',
//         title: 'Test Title',
//         content: 'Test Content',
//       });

//     expect(response.status).toEqual(201);
//     blogPostId = response.body.id;  // Store the blog post id if needed for further tests
//   });

//   test('should not allow user to create a blog post', async () => {
//     const response = await request
//       .post('/api/v2/blog-posts')
//       .set('Authorization', `Bearer ${userToken}`)
//       .send({
//         author: 'testUser',
//         title: 'Test Title',
//         content: 'Test Content',
//       });

//     expect(response.status).toEqual(403);
//   });

//   test('should not allow unauthorized user to delete a post', async () => {
//     const response = await request
//       .delete(`/api/v2/blog-posts/${blogPostId}`)
//       .set('Authorization', `Bearer ${userToken}`);

//     expect(response.status).toEqual(403);
//   });

//   test('should allow admin to delete a post', async () => {
//     const response = await request
//       .delete(`/api/v2/blog-posts/${blogPostId}`)
//       .set('Authorization', `Bearer ${adminToken}`);

//     expect(response.status).toEqual(200);
//   });
// });
