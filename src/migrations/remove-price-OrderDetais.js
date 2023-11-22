'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Xóa trường "price" từ bảng "CartItems"
    await queryInterface.removeColumn('OrderDetails', 'price');
  },
  async down(queryInterface, Sequelize) {
    // Nếu bạn muốn đảm bảo có thể rollback, bạn có thể thêm lại trường "price" trong phương thức down
    await queryInterface.addColumn('OrderDetails', 'price', {
      type: Sequelize.INTEGER
    });
  }
};
