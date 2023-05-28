'use strict';

const express = require('express');
const dataModules = require('../models');

// const basicAuth = require('../auth/middleware/basic');
const bearerAuth = require('../auth/middleware/bearer');
const permissions = require('../auth/middleware/acl');

const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', bearerAuth, handleGetAll);
router.get('/:model/:id', bearerAuth, handleGetOne);
router.post('/:model', bearerAuth, permissions('create'), handleCreate);
router.put('/:model/:id', bearerAuth, permissions('update'), handleUpdate);
router.delete('/:model/:id', bearerAuth, permissions('delete'), handleDelete);

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
  console.log(deletedBlogPost, `Resource with id ${id} was deleted`);
  res.status(200).json({message: `${id} was deleted`});
}

module.exports = router;
