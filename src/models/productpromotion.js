const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ProductPromotion extends Model {}

  ProductPromotion.init(
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
      modelName: 'ProductPromotion', // Tên của Model trung gian
    }
  );

  return ProductPromotion;
};
