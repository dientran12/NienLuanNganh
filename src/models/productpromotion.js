const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PromotionProduct extends Model {}

  PromotionProduct.init(
    {
      // Các trường của bảng trung gian (promotionId và productId là các khóa ngoại)
      promotionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: 'PromotionProduct', // Tên của Model trung gian
    }
  );

  return PromotionProduct;
};
