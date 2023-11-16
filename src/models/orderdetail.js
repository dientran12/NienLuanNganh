'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.SizeItem , {foreignKey:'sizeItemId', targetKey:'id', as:'productdata'})
      OrderDetail.belongsTo(models.Order, {foreignKey:'orderId', targetKey:'id', as:'orderdata'})
    }
  }
  OrderDetail.init({
    orderId:{
      type: DataTypes.INTEGER,
      references: {
        model:'Order', // Tên model của bảng Size
        key: 'id', // Tên trường khóa chính của bảng Size
      },
    },
    sizeItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SizeItem', // Tên model của bảng Size
        key: 'id', // Tên trường khóa chính của bảng Size
      },
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    totalPrice: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};