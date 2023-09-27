'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Định nghĩa quan hệ "nhiều-nhiều" giữa User và Address
      User.belongsToMany(models.Address, {
        through: 'UserAddress', // Tên của bảng trung gian
        foreignKey: 'userId', // Tên trường khóa ngoại trong bảng trung gian liên kết với User
        otherKey: 'addressId', // Tên trường khóa ngoại trong bảng trung gian liên kết với Address
      });
    }
  };

  User.init({
    idUser: DataTypes.INTEGER,
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    image: DataTypes.STRING,
    role: DataTypes.STRING,
    dateCreate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
