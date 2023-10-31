const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');

// Tạo đánh giá
router.post('/create', reviewController.createReview);
// Lấy tất cả đánh giá
router.get('/get-all', reviewController.getAllReviews);
// Lấy đánh giá theo sản phẩm
router.get('/get-review-by-product/:productId', reviewController.getReviewsByProduct);
// Lấy đánh giá theo người dùng
router.get('/get-review-by-user/:userId', reviewController.getReviewsByUser);
// Cập nhật đánh giá
router.put('/update/:id', reviewController.updateReview);
// Xóa đánh giá
router.delete('/delete/:id', reviewController.deleteReview);

module.exports = router;