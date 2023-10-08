const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Address, {
        through: 'UserAddress',
        foreignKey: 'userId',
        otherKey: 'addressId',
      });
      User.hasMany(models.Review, {
        foreignKey: 'userId', // Tên trường khóa ngoại trong bảng Reviews
        as: 'reviews', // Tên mối quan hệ, bạn có thể đặt tên khác nếu muốn
      });
    }
  };

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Đánh dấu cột "id" là primaryKey
      autoIncrement: true,
    },
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    role: DataTypes.STRING,
    phone: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
