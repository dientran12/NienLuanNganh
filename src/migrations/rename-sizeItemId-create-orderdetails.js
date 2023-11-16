'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thêm cột mới 'sizeItemId' vào bảng OrderDetails
    await queryInterface.addColumn('OrderDetails', 'sizeItemId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'SizeItems', // Thay 'SizeItems' bằng tên thực của bảng SizeItems
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Xóa cột 'versionId' khỏi bảng OrderDetails
    await queryInterface.removeColumn('OrderDetails', 'versionId');
  },

  down: async (queryInterface, Sequelize) => {
    // Thêm cột 'versionId' vào bảng OrderDetails
    await queryInterface.addColumn('OrderDetails', 'versionId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Versions',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Xóa cột 'sizeItemId' khỏi bảng OrderDetails
    await queryInterface.removeColumn('OrderDetails', 'sizeItemId');
  }
};
