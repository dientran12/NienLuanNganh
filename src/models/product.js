const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      //Quan hệ một-nhiều giữa Product và ProductDetail
      Product.hasMany(models.ProductDetail, { 
        foreignKey: 'productId',
        onDelete: ' CASCADE '       
      });

      // Quan hệ nhiều-nhiều giữa Product và Color thông qua ProductDetail
      Product.belongsToMany(models.Color, {
        through: 'ProductDetail',
        foreignKey: 'productId',
        otherKey: 'colorId',
        onDelete: ' CASCADE '
      });

      // Quan hệ nhiều-nhiều giữa Product và Size thông qua ProductDetail
      Product.belongsToMany(models.Size, {
        through: 'ProductDetail',
        foreignKey: 'productId',
        otherKey: 'sizeId',
        onDelete: ' CASCADE '
      });

      Product.belongsToMany(models.Promotion, {
        through: 'ProductPromotion',
        foreignKey: 'productId',
        otherKey: 'promotionId',
        onDelete: ' CASCADE '
      });
      
      // // Quan hệ nhiều-nhiều giữa Product và InvoiceDetail thông qua ProductDetail
      // Product.belongsToMany(models.InvoiceDetails, {
      //   through: 'ProductDetails',
      //   foreignKey: 'productId',
      //   otherKey: 'invoiceDetailId',
      // });

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
    }
  }

  Product.init({
    idProduct: {
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
