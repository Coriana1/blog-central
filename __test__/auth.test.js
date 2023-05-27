// 'use strict';

// const supertest = require('supertest');
// const jwt = require('jsonwebtoken');
// const app = require('../src/server');

// const SECRET = process.env.SECRET || 'secretstring';
// const request = supertest(app.server);
// let userToken, adminToken, blogPostId;

// function getToken(user) {
//   return jwt.sign({ username: user.username }, SECRET);
// }

// beforeAll(async () => {
//   const user = await app.users.create({
//     username: 'testUser',
//     password: 'testPassword',
//     role: 'user',
//   });

//   const admin = await app.users.create({
//     username: 'testAdmin',
//     password: 'testPassword',
//     role: 'admin',
//   });

//   userToken = getToken(user);
//   adminToken = getToken(admin);
// });

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
