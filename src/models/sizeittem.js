const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class SizeItem extends Model {
        static associate(models) {
          // Thiết lập quan hệ "nhiều-một" với bảng ProductVersion và Sizes
          SizeItem.belongsTo(models.Versions, {
            foreignKey: 'versionId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          });
          SizeItem.belongsTo(models.Size, {
            foreignKey: 'sizeId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          });
        }
      }
      
      SizeItem.init({
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        versionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Versions', 
            key: 'id', 
          },
        },   
        sizeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Size', 
            key: 'id', 
          },
        },   
      }, {
        sequelize,
        modelName: 'SizeItem', // Tên của model
      });
    return SizeItem;  
};
