const reviewService = require('../services/reviewService');

const createReview = async (req, res) => {
    try {
        const { productId, userId, comment, rating } = req.body;
        const result = await reviewService.createReview(productId, userId, comment, rating);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getReviewsByProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await reviewService.getReviewsByProduct(productId);
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getReviewsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const reviews = await reviewService.getReviewsByUser(userId);
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const { comment, rating } = req.body;
        const result = await reviewService.updateReview(reviewId, comment, rating);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const result = await reviewService.deleteReview(reviewId);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createReview,
    getAllReviews,
    getReviewsByProduct,
    getReviewsByUser,
    updateReview,
    deleteReview,
};
