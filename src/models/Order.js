const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
        // tao lien ket
    }
  };

  Order.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Đánh dấu cột "id" là primaryKey
      autoIncrement: true,
    },

    date: DataTypes.STRING,
    idAddress: DataTypes.INTEGER,
    Total: DataTypes.STRING,
    User_id: DataTypes.INTEGER,
    Payment_id: DataTypes.STRING,
    Cart_id: DataTypes.INTEGER,
    status_Order: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};