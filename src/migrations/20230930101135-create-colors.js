'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('colors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      colorName: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Sử dụng hàm MySQL để đặt giá trị mặc định
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), // Sử dụng hàm MySQL để tự động cập nhật ngày khi cập nhật dữ liệu
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('colors');
  },
};
