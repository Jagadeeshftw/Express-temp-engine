const sequelize = require("../util/database");
const {Sequelize,DataTypes} = require("sequelize");

const Cart = sequelize.define('cart', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  }
 
});

// Synchronize the model with the database

module.exports = Cart;