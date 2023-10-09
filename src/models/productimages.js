const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    static associate(models) {
      // Mối quan hệ "một-nhiều" giữa ProductImage và Colors
      ProductImage.belongsTo(models.Color, {
        foreignKey: 'colorId',
      });
    }
  }

  ProductImage.init(
    {
      idImage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      colorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Color', // Tên model của bảng Color
          key: 'idColor', // Tên trường khóa chính của bảng Color
        },
      },
      imageData: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: 'ProductImage', // Tên của Model, phải trùng với tên đã đặt trong Sequelize
    }
  );

  return ProductImage;
};