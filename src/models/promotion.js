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

  const formatDate = (date) => {
    if (date instanceof Date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return date;
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
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
        get() {
          return formatDate(this.getDataValue('startDate'));
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
        get() {
          return formatDate(this.getDataValue('endDate'));
        },
      },
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
