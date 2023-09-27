'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      // Định nghĩa quan hệ "nhiều-nhiều" giữa Address và User
      Address.belongsToMany(models.User, {
        through: 'UserAddress', // Tên của bảng trung gian
        foreignKey: 'addressId', // Tên trường khóa ngoại trong bảng trung gian liên kết với Address
        otherKey: 'userId', // Tên trường khóa ngoại trong bảng trung gian liên kết với User
      });
    }
  };

  Address.init({
    idAddress: DataTypes.INTEGER,
    address: DataTypes.STRING,
    nameIsUser: DataTypes.STRING,
    phone: DataTypes.STRING,
    idUser: DataTypes.INTEGER // Thêm trường idUser để liên kết với User
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
