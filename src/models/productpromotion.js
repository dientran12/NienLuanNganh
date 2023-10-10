const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ProductPromotion extends Model {
    static associate(models) {
      ProductPromotion.belongsTo(models.Promotion, { foreignKey: 'promotionId' } )
    }
  }

  ProductPromotion.init(
    {
      // Các trường của bảng trung gian (promotionId và productId là các khóa ngoại)
      promotionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Promotion', // Tên model của bảng Promotion
          key: 'id', // Tên trường khóa chính của bảng Promotion
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Product', // Tên model của bảng Product
          key: 'idProduct', // Tên trường khóa chính của bảng Product
        },
      },      
    },
    {
      sequelize,
      modelName: 'ProductPromotion', // Tên của Model trung gian
    }
  );

  return ProductPromotion;
};
