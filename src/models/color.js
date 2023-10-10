const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Color extends Model {
    static associate(models) {
      
      // // Mối quan hệ "nhiều-nhiều" giữa Colors và Product thông qua ProductDetails
      // Color.belongsToMany(models.Product, {
      //   through: 'ProductDetails', // Tên của bảng trung gian
      //   foreignKey: 'colorId', // Tên trường khóa ngoại trong bảng trung gian liên kết với Colors
      // });
    }
  }

  Color.init(
    {
      idColor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      colorName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Color', // Tên của Model, phải trùng với tên đã đặt trong Sequelize
    }
  );

  return Color;
};
