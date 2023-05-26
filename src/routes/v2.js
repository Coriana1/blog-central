'use strict';

const express = require('express');
const blogPostModels = require('../models');

const router = express.Router();


const basicAuth = require('../auth/middleware/basic');
const bearerAuth = require('../auth/middleware/bearer');
const acl = require('../auth/middleware/acl');


router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (blogPostModels[modelName]) {
    req.model = blogPostModels[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:blog-posts', basicAuth, handleGetAll);
router.get('/:blog-posts/:id', basicAuth, handleGetOne);
router.post('/:blog-posts', bearerAuth, acl('create'), handleCreate);
router.patch('/:blog-posts', bearerAuth, acl('update'), handleUpdate);
router.put('/:blog-posts/:id', bearerAuth, acl('update'), handleUpdate);
router.delete('/:blog-posts/:id', bearerAuth, acl('delete'), handleDelete);

async function handleGetAll(req, res) {
  let allBlogPosts = await req.model.get();
  res.status(200).json(allBlogPosts);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let blogPost = await req.model.get(id);
  res.status(200).json(blogPost);
}

async function handleCreate(req, res) {
  let blogPostData = req.body;
  let newBlogPost = await req.model.create(blogPostData);
  res.status(201).json(newBlogPost);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const updatedData = req.body;
  let updatedBlogPost = await req.model.update(id, updatedData);
  res.status(200).json(updatedBlogPost);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedBlogPost = await req.model.delete(id);
  res.status(200).json(deletedBlogPost);
}

module.exports = router;
