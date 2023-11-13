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
      CartItem.belongsTo(models.Versions, {foreignKey:'versionId', targetKey:'id', as:'productdata'})
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
    versionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Versions', // Tên model của bảng Size
        key: 'id', // Tên trường khóa chính của bảng Size
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};