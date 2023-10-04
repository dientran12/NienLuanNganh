'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductImages', {
      idImage: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dataImage: {
        type: Sequelize.BLOB('long'), // Lưu trữ dữ liệu hình ảnh dưới dạng binary
        allowNull: false,
      },
      colorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'colors', // Tên bảng mà colorId liên kết đến
          key: 'idColor', // Tên trường khóa chính trong bảng Colors
        },
      },    
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProductImages');
  },
};
