'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const blogPostModel = require('./blogs/model');
const userModel = require('../auth/models/users.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);
const BlogPost = blogPostModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  blogPosts: BlogPost,
  users,
};
