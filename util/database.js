// ProductModel.js

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'jaga2606', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
