'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Xóa trường "price" từ bảng "CartItems"
    await queryInterface.removeColumn('Orders', 'confirmed');
    await queryInterface.removeColumn('Orders', 'status');
  },
};