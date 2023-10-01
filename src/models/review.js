const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }

  Review.init(
    {
      content: {
        type: DataTypes.TEXT, // Kiểu dữ liệu cho nội dung đánh giá (dài hơn kiểu STRING)
        allowNull: false, // Không được phép giá trị null
      },
      rating: {
        type: DataTypes.INTEGER, // Kiểu dữ liệu cho điểm đánh giá (sử dụng INTEGER hoặc DECIMAL tùy theo yêu cầu)
        allowNull: false,
        validate: {
          min: 1, // Đánh giá tối thiểu là 1
          max: 5, // Đánh giá tối đa là 5
        },
      },
      // Các trường khác nếu cần
    },
    {
      sequelize,
      modelName: 'Review', // Tên của Model, phải trùng với tên đã đặt trong Sequelize
    }
  );

  return Review;
};
