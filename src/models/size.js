const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Size extends Model {
    static associate(models) {
      Size.hasMany(models.SizeItem, {        
        foreignKey: 'sizeId',    
      });
    }
  }

  Size.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sizeName: {
      type: DataTypes.STRING,
      unique: true, // Đặt thuộc tính unique ở đây
    }, 
  }, {
    sequelize,
    modelName: 'Size',
  });

  return Size;
};
