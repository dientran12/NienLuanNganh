'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Colors', 'colorName', {
      type: Sequelize.STRING,
      unique: true, // Đặt thuộc tính unique thành true
      allowNull: false, // Nếu colorName không được phép null
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Nếu cần rollback thay đổi, bạn có thể viết mã ở đây
  }
};
