'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index');
const basicAuth = require('./middleware/basic');
const bearerAuth = require('./middleware/bearer');
const permissions = require('./middleware/acl');

authRouter.post('/signup', async (req, res, next) => {
  console.log('I AM HERE');
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord, 
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => [user.id, user.username, user.role, user.token]);
  res.status(200).json(list);
  // res.status(200).json(userRecords);

});

authRouter.put('/users/:id', bearerAuth, permissions('update'), async (req, res, next) => {
  try {
    const id = req.params.id;
    let updateData = req.body;
    let userToUpdate = await users.findOne({ where: {id} });

    if (!userToUpdate) {
      res.status(404).json({message: 'User not found'});
      return;
    }

    let updatedUser = await userToUpdate.update(updateData);

    console.log(`User with id ${id} was updated`);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});


authRouter.delete('/users/:id', bearerAuth, permissions('delete'), async (req, res, next) => {
  try {
    const id = req.params.id;
    let userToDelete = await users.findOne({ where: {id} });

    if (!userToDelete) {
      res.status(404).json({message: 'User not found'});
      return;
    }

    await userToDelete.destroy();

    console.log(`User with id ${id} was deleted`);
    res.status(200).json({message: `User with id ${id} was deleted`});
  } catch (error) {
    next(error);
  }
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area');
});

module.exports = authRouter;