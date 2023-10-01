const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ProductDetail extends Model {
    static associate(models) {
      // Mối quan hệ nhiều-nhiều với Product thông qua ProductDetails
      ProductDetail.belongsTo(models.Product, { foreignKey: 'productId' });
      ProductDetail.belongsTo(models.Color, { foreignKey: 'colorId' });
      ProductDetail.belongsTo(models.Size, { foreignKey: 'sizeId' });
      ProductDetail.belongsTo(models.InvoiceDetails, { foreignKey: 'invoiceDetailId' });
    }
  }

  ProductDetail.init(
    {
      inventoryQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ProductDetail', // Tên của Model, phải trùng với tên đã đặt trong Sequelize
    }
  );

  return ProductDetail;
};
