const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ProductDetail extends Model {
    static associate(models) {
      // // Mối quan hệ nhiều-nhiều với Product thông qua ProductDetails
      ProductDetail.belongsTo(models.Product, { foreignKey: 'productId' });
      ProductDetail.belongsTo(models.Color, { foreignKey: 'colorId' });
      ProductDetail.belongsTo(models.Size, { foreignKey: 'sizeId' });      
    }
  }

  ProductDetail.init(
    { 
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Đánh dấu cột "id" là primaryKey
        autoIncrement: true,
      },           
      sizeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Size', // Tên model của bảng Size
          key: 'id', // Tên trường khóa chính của bảng Size
        },
      },    
      colorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Color', // Tên model của bảng Color
          key: 'id', // Tên trường khóa chính của bảng Color
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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },      
      image: DataTypes.TEXT,     
    },
    {
      sequelize,
      modelName: 'ProductDetail', // Tên của Model, phải trùng với tên đã đặt trong Sequelize
    },
      
  );

  return ProductDetail;
};
