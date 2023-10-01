const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ProductImage extends Model {
    static associate(models) {
      // Mối quan hệ "một-nhiều" giữa ProductImage và Colors
      ProductImage.belongsTo(models.Colors, {
        foreignKey: 'colorId',
      });
    }
  }

  ProductImage.init(
    {
      idProductImage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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