'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Xóa trường "price" từ bảng "CartItems"
    await queryInterface.removeColumn('CartItems', 'discount');
  },
};