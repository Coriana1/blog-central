'use strict';

const express = require('express');
const dataModules = require('../models');

const basicAuth = require('../auth/middleware/basic');
const bearerAuth = require('../auth/middleware/bearer');
const acl = require('../auth/middleware/acl');

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

router.get('/users/:userId', basicAuth, handleGetOne);
router.put('/users/:userId', bearerAuth, acl('update'), handleUpdate);
router.delete('/users/:userId', bearerAuth, acl('delete'), handleDelete);

async function handleGetOne(req, res) {
  const userId = req.params.userId;
  let userRecord = await req.model.getUserById(userId);
  if (userRecord) {
    res.status(200).json(userRecord);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}

async function handleUpdate(req, res) {
  const userId = req.params.userId;
  const updatedUserData = req.body;
  let updatedUser = await req.model.updateUserById(userId, updatedUserData);
  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}

async function handleDelete(req, res) {
  const userId = req.params.userId;
  let deletedUser = await req.model.deleteUser(userId);
  if (deletedUser) {
    res.status(200).json({ message: 'User deleted successfully' });
}

module.exports = router;