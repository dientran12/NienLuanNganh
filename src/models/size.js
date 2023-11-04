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
    sizeName: DataTypes.STRING, 
  }, {
    sequelize,
    modelName: 'Size',
  });

  return Size;
};
