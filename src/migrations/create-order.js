'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      idAddress: {
        type: Sequelize.STRING
      },
      Total: {
        type: Sequelize.STRING
      },
      User_id: {
        type: Sequelize.STRING
      },
      Payment_id: {
        type: Sequelize.INTEGER
      },
      Cart_id: {
        type: Sequelize.STRING,
        defaultValue: 'customer'
      },
      status_Order: {
        type: Sequelize.DATE
      },
      createdAt: {allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      updatedAt: {allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};