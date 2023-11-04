module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Categories', {
      fields: ['categoryName'],
      type: 'unique',
      name: 'unique_category_name' // Tên tùy chọn cho ràng buộc
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Categories', 'unique_category_name');
  }
};
