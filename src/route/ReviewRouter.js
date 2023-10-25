const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');


router.post('/create', reviewController.createReview);
router.get('/getAll', reviewController.getAllReviews);
router.get('/getReviewsByProduct/:productId', reviewController.getReviewsByProduct);
router.get('/getReviewsByUser/:userId', reviewController.getReviewsByUser);
router.put('/update/:id', reviewController.updateReview);
router.delete('/delete/:id', reviewController.deleteReview);

module.exports = router;