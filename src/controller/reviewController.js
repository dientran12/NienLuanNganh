const reviewService = require('../services/reviewService');

const createReview = async (req, res) => {
    try {
        const { productId, userId } = req.body;
        let { rating } = req.body; 
        rating = parseInt(rating, 10);
        const isValidRating = Number.isInteger(rating) && rating >= 1 && rating <= 5;

        if (!isValidRating) {
            return res.status(400).json({ success: false, message: 'Invalid rating. Rating must be an integer between 1 and 5.' });
        }

        const result = await reviewService.createReview(productId, userId, rating);
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
        let { rating } = req.body; 
        
        rating = parseInt(rating);
        const isValidRating = Number.isInteger(rating) && rating >= 1 && rating <= 5;

        if (!isValidRating) {
            return res.status(400).json({ success: false, message: 'Invalid rating. Rating must be an integer between 1 and 5.' });
        }

        const result = await reviewService.updateReview(reviewId, rating);
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
