const promotionService = require('../services/promotionService');
const productPromotionService = require('../services/productPromotionService'); 
const moment = require('moment');
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
    // Chuyển đổi định dạng ngày tháng từ DD/MM/YYYY sang MM/DD/YYYY
    const formattedStartDate = moment(startDate, 'DD/MM/YYYY').format('MM/DD/YYYY');
    const formattedEndDate = moment(endDate, 'DD/MM/YYYY').format('MM/DD/YYYY');

    try {
    const newPromotion = await promotionService.createPromotion(name, percentage, formattedStartDate, formattedEndDate);
      res.status(201).json(newPromotion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  updatePromotion: async (req, res) => {
    const { id } = req.params;
    const { name, percentage, startDate, endDate } = req.body;
    try {
      const updatedPromotion = await promotionService.updatePromotion(id, name, percentage, startDate, endDate);
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

  getPromotionById: async (req, res) => {
    const id = req.params.id;    
    try {
      const Promotion = await promotionService.getPromotionById(id);
      if (Promotion.success) {
        res.status(200).json(Promotion);
      } else {
        res.status(404).json(Promotion);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  deletePromotion: async (req, res) => {
    const { promotionId } = req.params.id;
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

  getProductPromotionById: async (req, res) => {
    const id = req.params.id;    
    try {
      const productPromotion = await productPromotionService.getProductPromotionsByProductId(id);
      if (productPromotion.success) {
        res.status(200).json(productPromotion);
      } else {
        res.status(404).json(productPromotion);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = promotionController;
