  const { Model, DataTypes } = require('sequelize');

  module.exports = (sequelize) => {
    class Versions extends Model {
      static associate(models) {
        // // Mối quan hệ nhiều-nhiều với Product thông qua ProductDetails
        Versions.belongsTo(models.Product, { foreignKey: 'productId' });
        Versions.belongsTo(models.Color, { foreignKey: 'colorId' });
        Versions.hasMany(models.SizeItem, {       
          foreignKey: 'versionId' 
        });      
        
      }
    }

    Versions.init(
      { 
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true, // Đánh dấu cột "id" là primaryKey
          autoIncrement: true,
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
        image: DataTypes.TEXT,     
      },
      {
        sequelize,
        modelName: 'Versions', // Tên của Model, phải trùng với tên đã đặt trong Sequelize
      },
        
    );

    return Versions;
  };
