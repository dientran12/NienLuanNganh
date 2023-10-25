// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('Orders', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       cartItemsId: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: 'CartItems',
//           key: 'id'
//         },
//         onDelete: 'SET NULL'
//       },
//       usersId: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: 'Users',
//           key: 'id'
//         }
//       },
//       date: {
//         type: Sequelize.STRING
//       },
//       idAddress: {
//         type: Sequelize.STRING
//       },
//       total: {
//         type: Sequelize.STRING
//       },
//       paymentId: {
//         type: Sequelize.INTEGER
//       },
//       statusOrder: {
//         type: Sequelize.STRING
//       },
//       quantity: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         defaultValue: 1,
//       },
//       price: {
//         type: Sequelize.INTEGER, // Thêm cột "price"
//         // allowNull: false, // Tuỳ chọn này để đảm bảo không có giá trị rỗng
//         // defaultValue: 0, // Giá trị mặc định (thay đổi tùy ý)
//       },
//       createdAt: {
//         allowNull: false,
//         type: 'TIMESTAMP',
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//       },
//       updatedAt: {
//         allowNull: false,
//         type: 'TIMESTAMP',
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//       }
//     });
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('Orders');
//   }
// };

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cartItemsId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CartItems',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      usersId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      date: {
        type: Sequelize.STRING
      },
      idAddress: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.STRING
      },
      paymentId: {
        type: Sequelize.INTEGER
      },
      statusOrder: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
