const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Promotions extends Model {
    static associate(models) {
      // Mối quan hệ "nhiều-nhiều" giữa Promotion và Product thông qua bảng ProductPromotion
      Promotions.belongsToMany(models.Product, {
        through: 'ProductPromotions', // Tên bảng trung gian
        foreignKey: 'promotionId', // Tên cột khóa ngoại của Promotion trong bảng trung gian        
      });  
    }
  }

  Promotions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Các trường của bảng Promotion
      name: DataTypes.STRING,
      percentage: DataTypes.FLOAT,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      description: {
        type: DataTypes.TEXT,
        allowNull: true, 
      },
    },
    {
      sequelize,
      modelName: 'Promotions', // Tên của Model, phải trùng với tên đã đặt trong Sequelize
    },
  );

  return Promotions;
};
