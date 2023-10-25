const promotionService = require('../services/promotionService');
// const productService = require('../services/productService');

const promotionController = {
  getAllPromotions: async (req, res) => {
    try {
      const promotions = await promotionService.getAllPromotions();
      res.status(200).json(promotions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  createPromotion: async (req, res) => {
    const { name, percentage, startDate, endDate } = req.body;
    try {
      const newPromotion = await promotionService.createPromotion(name, percentage, startDate, endDate);
      res.status(201).json(newPromotion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  updatePromotion: async (req, res) => {
    const { promotionId } = req.params;
    const { name, percentage, startDate, endDate } = req.body;
    try {
      const updatedPromotion = await promotionService.updatePromotion(promotionId, name, percentage, startDate, endDate);
      if (updatedPromotion.success) {
        res.status(200).json(updatedPromotion);
      } else {
        res.status(404).json(updatedPromotion);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  deletePromotion: async (req, res) => {
    const { promotionId } = req.params;
    try {
      const deletedPromotion = await promotionService.deletePromotion(promotionId);
      if (deletedPromotion.success) {
        res.status(200).end();
      } else {
        res.status(404).json(deletedPromotion);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  applyPromotionToProduct: async (req, res) => {
    const { productId, promotionId } = req.params;
    try {
      const result = await promotionService.applyPromotionToProduct(productId, promotionId);
      if (result.success) {
        // Áp dụng logic khuyến mãi tại đây nếu cần thiết
        // Ví dụ: productService.applyDiscount(productId, result.infomation.discountAmount);
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = promotionController;
