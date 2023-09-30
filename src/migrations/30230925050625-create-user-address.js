'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserAddress', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUser: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Tên bảng User
          key: 'id' // Tên trường khóa chính trong bảng User
        },
        allowNull: false
      },
      idAddress: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Addresses', // Tên bảng Address
          key: 'id' // Tên trường khóa chính trong bảng Address
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserAddress');
  }
};
