'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
  
      CartItem.belongsTo(models.Product, {foreignKey:'productID', targetKey:'idProduct', as:'productdata'})
      CartItem.belongsTo(models.Cart, {foreignKey:'cartID', targetKey:'id', as:'cartdata'});
    }
  }
  CartItem.init({
    cartID:{
      type: DataTypes.INTEGER,
      references: {
        model:'Cart', // Tên model của bảng Size
        key: 'id', // Tên trường khóa chính của bảng Size
      },
    },
    productID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product', // Tên model của bảng Size
        key: 'idProduct', // Tên trường khóa chính của bảng Size
      },
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};