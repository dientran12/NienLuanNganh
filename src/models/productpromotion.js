const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ProductPromotions extends Model {
    static associate(models) {
      ProductPromotions.belongsTo(models.Product, {
        foreignKey: "productId",
      });
      ProductPromotions.belongsTo(models.Promotions, {
        foreignKey: "promotionId",
      });
    }
  }

  ProductPromotions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Đánh dấu cột "id" là primaryKey
        autoIncrement: true,
      },
      // Các trường của bảng trung gian (promotionId và productId là các khóa ngoại)
      promotionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Promotions', // Tên model của bảng Promotion
          key: 'id', // Tên trường khóa chính của bảng Promotion
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Product', // Tên model của bảng Product
          key: 'id', // Tên trường khóa chính của bảng Product
        },
      },      
    },
    {
      sequelize,
      modelName: 'ProductPromotions', // Tên của Model trung gian
    }
  );

  return ProductPromotions;
};
