const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CategoryProducts extends Model {
    static associate(models) {
      // Mối quan hệ "một-nhiều" giữa CategoryProduct và Products
      CategoryProducts.belongsTo(models.Product, {
        foreignKey: 'productId', // Khóa ngoại trong CategoryProduct liên kết với Products
      });
      
      // Mối quan hệ "một-nhiều" giữa CategoryProduct và Categories
      CategoryProducts.belongsTo(models.Categories, {
        foreignKey: 'categoryId', // Khóa ngoại trong CategoryProduct liên kết với Categories
      });
    }
  }

  CategoryProducts.init(
    {           
      // Khóa ngoại liên kết với Products
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products', // Tên của bảng mà khóa ngoại liên kết với
          key: 'id', // Tên của trường khóa chính trong Products
        },
      },
      // Khóa ngoại liên kết với Categories
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories', // Tên của bảng mà khóa ngoại liên kết với
          key: 'id', // Tên của trường khóa chính trong Categories
        },
      },
    },
    {
      sequelize,
      modelName: 'CategoryProducts', // Tên của Model, phải trùng với tên đã đặt trong Sequelize
    }
  );

  return CategoryProducts;
};
