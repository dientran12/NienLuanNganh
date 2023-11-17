'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Thêm trường "discount" vào bảng "CartItems"
    await queryInterface.addColumn('CartItems', 'discount', {
      type: Sequelize.FLOAT,
      defaultValue: 0 // Giá trị mặc định của trường discount, nếu cần
    });
  },
  async down(queryInterface, Sequelize) {
    // Nếu bạn muốn đảm bảo có thể rollback, bạn có thể xóa trường "discount" trong phương thức down
    await queryInterface.removeColumn('CartItems', 'discount');
  }
};
