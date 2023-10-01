'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('suppliers', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: true, // Nếu không muốn trường này được null, đặt là false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('suppliers', 'phoneNumber');
  },
};
