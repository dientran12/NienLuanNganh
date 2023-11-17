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
      CartItem.belongsTo(models.SizeItem, {foreignKey:'sizeItemId', targetKey:'id', as:'productdata'})
      CartItem.belongsTo(models.Cart, {foreignKey:'cartId', targetKey:'id', as:'cartdata'})
    }
  }
  CartItem.init({
    cartId:{
      type: DataTypes.INTEGER,
      references: {
        model:'Cart', // Tên model của bảng Size
        key: 'id', // Tên trường khóa chính của bảng Size
      },
    },
    sizeItemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SizeItem', // Tên model của bảng Size
        key: 'id', // Tên trường khóa chính của bảng Size
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    discount: {
      type: DataTypes.FLOAT,
      defaultValue: 1,
    },
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};