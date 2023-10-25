const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Size extends Model {
    static associate(models) {
      // Định nghĩa quan hệ "nhiều-nhiều" với bảng Product thông qua bảng trung gian ProductDetails
      Size.belongsToMany(models.Product, {
        through: 'ProductDetails',
        foreignKey: 'sizeId', // Tên trường khóa ngoại trong bảng trung gian liên kết với Size       
      });
    }
  }

  Size.init({
    idSize: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sizeName: DataTypes.STRING, 
  }, {
    sequelize,
    modelName: 'Size',
  });

  return Size;
};
