const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsToMany(models.User, {
        through: 'UserAddress',
        foreignKey: 'addressId',
        otherKey: 'userId',
      });
    }
  };

  Address.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Đánh dấu cột "id" là primaryKey
      autoIncrement: true,
    },
    address: DataTypes.STRING,
    nameIsUser: DataTypes.STRING,
    phone: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
