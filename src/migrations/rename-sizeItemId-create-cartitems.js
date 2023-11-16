'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thêm cột mới 'sizeItemId' vào bảng CartItems
    await queryInterface.addColumn('CartItems', 'sizeItemId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'SizeItems', // Thay 'SizeItems' bằng tên thực của bảng SizeItems
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Xóa cột 'versionId' khỏi bảng CartItems
    await queryInterface.removeColumn('CartItems', 'versionId');
  },

  down: async (queryInterface, Sequelize) => {
    // Thêm cột 'versionId' vào bảng CartItems
    await queryInterface.addColumn('CartItems', 'versionId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Versions',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Xóa cột 'sizeItemId' khỏi bảng CartItems
    await queryInterface.removeColumn('CartItems', 'sizeItemId');
  }
};
