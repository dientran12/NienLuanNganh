'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoiceName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2), // Đây là một ví dụ, bạn có thể điều chỉnh kiểu dữ liệu cho tổng tiền
        allowNull: false
      },
      supplierId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Suppliers', // Tên bảng liên kết
          key: 'idSupplier' // Tên trường khóa chính trong bảng liên kết
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Invoices');
  }
};
