'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ProductDetails', 'sizeId');
    await queryInterface.removeColumn('ProductDetails', 'quantity');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ProductDetails', 'sizeId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Sizes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addColumn('ProductDetails', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
