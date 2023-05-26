'use strict';

const blogPostModel = (sequelize, DataTypes) => sequelize.define('BlogPost', {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: { 
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: { 
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  //stretch goal
  image: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = blogPostModel;
