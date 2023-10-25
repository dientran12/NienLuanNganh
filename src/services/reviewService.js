const db = require('../models');
const Review = db.Review;

const createReview = async (productId, userId, comment, rating) => {
    try {
        const review = await Review.create({
            productId,
            userId,
            comment,
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
                userId: userId,
            },
        });
        return { success: true, message: 'Reviews retrieved successfully', data: reviews };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
};

const updateReview = async (reviewId, updatedComment, updatedRating) => {
  try {
      const review = await Review.findByPk(reviewId);
      if (!review) {
          return { success: false, message: 'Review not found' };
      }

      review.comment = updatedComment;
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

