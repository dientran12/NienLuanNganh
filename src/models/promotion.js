const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Promotion extends Model {
    static associate(models) {
      // Mối quan hệ "nhiều-nhiều" giữa Promotion và Product thông qua bảng ProductPromotion
      Promotion.belongsToMany(models.Product, {
        through: 'ProductPromotion',
        foreignKey: 'promotionId',
      });
    }
  }

  Promotion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Các trường của bảng Promotion
      name: DataTypes.STRING,
      discountPercentage: DataTypes.FLOAT,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Promotion', // Tên của Model, phải trùng với tên đã đặt trong Sequelize
    }
  );

  return Promotion;
};
