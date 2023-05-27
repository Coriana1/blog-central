'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const blogModel = require('./blogs/model');
const vlogModel = require('./vlogs/model');
const userModel = require('../auth/models/users.js');
const Collection = require('./data.collection');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);
const Blog = blogModel(sequelize, DataTypes);
const Vlog = vlogModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  blog: new Collection(Blog),
  vlog: new Collection(Vlog),
  users,
};
