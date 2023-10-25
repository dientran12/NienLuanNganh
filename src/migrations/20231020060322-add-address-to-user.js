'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.STRING, // Thay kiểu dữ liệu tùy theo yêu cầu của bạn
      allowNull: true, // Hoặc false nếu trường "address" không được phép null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'address');
  },
};
