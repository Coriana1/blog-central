'use strict';

const express = require('express');
const dataModules = require('../models');

const router = express.Router();

//middleware to set route params
router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    // req.model = userModel;
    {
      next();
    }
  } else {
    next('Invalid Model');
  }
});

//Route to blog post (all, sinlge post by id, create new, update, delete all by id)
router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

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
  console.log(`Resource with id ${id} was deleted`, deletedBlogPost);
  res.status(200).json({message: `${id} was deleted`});
}

module.exports = router;
