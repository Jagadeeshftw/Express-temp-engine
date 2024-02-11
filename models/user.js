const sequelize = require("../util/database");
const {Sequelize,DataTypes} = require("sequelize");

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

// Synchronize the model with the database

module.exports = User;