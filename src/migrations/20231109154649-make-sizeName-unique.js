'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Sizes', 'sizeName', {
      type: Sequelize.STRING,
      unique: true, // Đặt thuộc tính unique thành true
      allowNull: false, // Nếu sizeName không được phép null
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Nếu cần rollback thay đổi, bạn có thể viết mã ở đây
  }
};
