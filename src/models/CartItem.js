'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CartItem.init({
    productname: DataTypes.STRING,
    quantity: DataTypes.STRING,
    productID: DataTypes.STRING,
    cartID: DataTypes.STRING,
    role_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};