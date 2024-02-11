const sequelize = require("../util/database");
const {Sequelize,DataTypes} = require("sequelize");

const CartItems = sequelize.define('cartItems', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
 
});

// Synchronize the model with the database

module.exports = CartItems;