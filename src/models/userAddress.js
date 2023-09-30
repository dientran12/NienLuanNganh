'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAddress extends Model {
    static associate(models) {
      // Không cần định nghĩa quan hệ ở đây vì đây là bảng trung gian
    }
  };

  UserAddress.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // Tên model liên kết
        key: 'id' // Tên trường khóa chính trong model liên kết
      }
    },
    addressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Address', // Tên model liên kết
        key: 'id' // Tên trường khóa chính trong model liên kết
      }
    },
  }, {
    sequelize,
    modelName: 'UserAddress',
    tableName: 'UserAddress' // Tên của bảng trung gian
  });
  return UserAddress;
};
