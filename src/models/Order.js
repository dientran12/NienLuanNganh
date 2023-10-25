
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Order extends Model {
//     static associate(models) {
//       Order.belongsTo(models.CartItem, {
//         foreignKey: 'cartItemsId',
//         targetKey: 'id',
//         as: 'CartItemData'
//       });
//       Order.belongsTo(models.User, {
//         foreignKey: 'usersId',
//         targetKey: 'id',
//         as: 'UserData'
//       });
//     }
//   }

//   Order.init({
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     date: DataTypes.STRING,
//     idAddress: DataTypes.STRING,
//     total: DataTypes.STRING,
//     userId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'Users',
//         key: 'id'
//       }
//     },
//     paymentId: DataTypes.INTEGER,
//     cartId: DataTypes.INTEGER,
//     statusOrder: DataTypes.STRING,
//     quantity: DataTypes.INTEGER, // Thuộc tính quantity
//     price: DataTypes.INTEGER,
//   }, {
//     sequelize, // Thêm đối tượng sequelize
//     modelName: 'Order',
//     tableName: 'Orders', // Thay tên bảng 'Orders' nếu tên bảng trong cơ sở dữ liệu của bạn khác
//   });

//   return Order;
// };
'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Mối quan hệ Order thuộc về CartItem (cartItemsId)
      Order.belongsTo(models.CartItem, {
        foreignKey: 'cartItemsId',
        targetKey: 'id',
        as: 'CartItemData'
      });
      
      // Mối quan hệ Order thuộc về User (usersId)
      Order.belongsTo(models.User, {
        foreignKey: 'usersId',
        targetKey: 'id',
        as: 'UserData'
      });
    }
  }

  Order.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: DataTypes.STRING,
    idAddress: DataTypes.STRING,
    total: DataTypes.STRING,
    usersId: DataTypes.INTEGER, // Thêm cột "usersId"
    paymentId: DataTypes.INTEGER,
    cartItemsId: DataTypes.INTEGER, // Thêm cột "cartId"
    statusOrder: DataTypes.STRING,
    quantity: DataTypes.INTEGER, // Thuộc tính quantity
    price: DataTypes.INTEGER,
  }, {
    sequelize, // Thêm đối tượng sequelize
    modelName: 'Order',
    tableName: 'Orders', // Thay tên bảng 'Orders' nếu tên bảng trong cơ sở dữ liệu của bạn khác
  });

  return Order;
};

