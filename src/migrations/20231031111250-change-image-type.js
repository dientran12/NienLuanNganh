'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'image', {
      type: Sequelize.TEXT('long'),
      allowNull: true, // Điều này phụ thuộc vào yêu cầu của ứng dụng của bạn
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'image', {
      type: Sequelize.STRING,
      allowNull: true, // Điều này phụ thuộc vào yêu cầu của ứng dụng của bạn
    });
  }
};
