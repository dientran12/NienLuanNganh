const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Quan hệ nhiều-nhiều giữa Product và Color thông qua ProductDetail
      Product.belongsToMany(models.Color, {
        through: 'ProductDetails',
        foreignKey: 'productId',        
        onDelete: ' CASCADE '
      });

      // Quan hệ nhiều-nhiều giữa Product và Size thông qua ProductDetail
      Product.belongsToMany(models.Size, {
        through: 'ProductDetails',
        foreignKey: 'productId',       
        onDelete: ' CASCADE '
      });

      
      Product.belongsToMany(models.Promotions, {
        through: 'ProductPromotions', // Tên bảng trung gian
        foreignKey: 'productId', // Tên cột khóa ngoại của Product trong bảng trung gian
        onDelete: 'CASCADE'        
      });
      
            
      // Quan hệ nhiều-nhiều giữa Product và Category thông qua CategoryProduct
      Product.belongsToMany(models.Categories, {
        through: 'CategoryProducts',
        foreignKey: 'productId',
        otherKey: 'categoryId',
        onDelete: ' CASCADE '
      });

      // Quan hệ một-nhiều giữa Product và Review
      Product.hasMany(models.Review, { 
        foreignKey: 'productId',
        onDelete: 'CASCADE',
        hooks: true
       });
       
       // Quan hệ một-nhiều giữa Product và Review
      Product.hasMany(models.ProductDetail, { 
        foreignKey: 'productId',
        as: 'Details',
        onDelete: 'CASCADE',
        hooks: true
       });
    }
  }

  Product.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    origin: DataTypes.STRING,
    brand: DataTypes.STRING,
    type: DataTypes.STRING,
    gender: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',    
  });

  return Product;
};
