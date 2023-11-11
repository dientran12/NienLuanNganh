const db = require('../models');
const Review = db.Review;

const createReview = async (productId, userId, rating) => {
    try {
        // Kiểm tra xem đã có review của userId cho productId này chưa
        const existingReview = await Review.findOne({
            where: {
                productId,
                userId,
            },
        });

        if (existingReview) {
            return { success: false, message: 'User has already reviewed this product', data: existingReview };
        }

        // Nếu chưa có review, tạo mới
        const review = await Review.create({
            productId,
            userId,
            rating,
        });

        return { success: true, message: 'Review created successfully', data: review };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
};


const getAllReviews = async () => {
    try {
        const reviews = await Review.findAll();
        return { success: true, message: 'Reviews retrieved successfully', data: reviews };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
};

const getReviewsByProduct = async (productId) => {
    try {
        const reviews = await Review.findAll({
            where: {
                productId: productId,
            },
        });
        return { success: true, message: 'Reviews retrieved successfully', data: reviews };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
};

const getReviewsByUser = async (userId) => {
    try {
        const reviews = await Review.findAll({
            where: {
                id: userId,
            },
        });
        return { success: true, message: 'Reviews retrieved successfully', data: reviews };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
};

const updateReview = async (reviewId, updatedRating) => {
  try {
      const review = await Review.findByPk(reviewId);
      if (!review) {
          return { success: false, message: 'Review not found' };
      }
      
      review.rating = updatedRating;
      await review.save();

      return { success: true, message: 'Review updated successfully', data: review };
  } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal Server Error' };
  }
};

const deleteReview = async (reviewId) => {
  try {
      const review = await Review.findByPk(reviewId);
      if (!review) {
          return { success: false, message: 'Review not found' };
      }

      await review.destroy();
      return { success: true, message: 'Review deleted successfully' };
  } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal Server Error' };
  }
};

module.exports = {
    createReview,
    getAllReviews,
    getReviewsByProduct,
    getReviewsByUser,
    updateReview,
    deleteReview
};

