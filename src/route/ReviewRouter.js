const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');


router.post('/create', reviewController.createReview);
router.get('/get-all', reviewController.getAllReviews);
router.get('/get-review-by-product/:productId', reviewController.getReviewsByProduct);
router.get('/get-review-by-user/:userId', reviewController.getReviewsByUser);
router.put('/update/:id', reviewController.updateReview);
router.delete('/delete/:id', reviewController.deleteReview);

module.exports = router;