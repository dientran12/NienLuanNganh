// models/Order.js
import db from '../models'
import { DataTypes, Model } from 'sequelize';

module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
      // Định nghĩa mối quan hệ với User hoặc các quan hệ khác nếu cần
      Order.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
      Order.hasMany(models.OrderDetail, { foreignKey: 'orderId' });
    }
  }

  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shippingAddress: {
        type: DataTypes.STRING,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
        defaultValue: 'Pending',
      },
      paymentMethod: {
        type: DataTypes.ENUM('Credit Card', 'PayPal', 'Cash on Delivery', 'Bank Transfer'),
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Mặc định là chưa được xác nhận
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );

  return Order;
};
