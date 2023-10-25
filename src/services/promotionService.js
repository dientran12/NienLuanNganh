const db = require('../models/index');
const Promotion = db.Promotions;
const Product = db.Product;
const ProductPromotions = db.ProductPromotions;

const promotionService = {
    getAllPromotions: async () => {
        try {
          const promotions = await Promotion.findAll();
          console.log(promotions);
          return promotions;
        } catch (error) {
          console.error(error);
        }
    },

    createPromotion: async (name, percentage, startDate, endDate) => {
        try {
          const newPromotion = await Promotion.create({
            name: name,
            percentage: percentage,
            startDate: startDate,
            endDate: endDate,
          });
          console.log('New promotion created:', newPromotion);
          return newPromotion;
        } catch (error) {
          console.error(error);
        }
      },
      //createPromotion('Special Sale', 15, new Date(), new Date('2023-12-31'));
      updatePromotion: async (promotionId, name, percentage, startDate, endDate) => {
        try {
          const promotion = await Promotion.findByPk(promotionId);
          if (promotion) {
            promotion.name = name;
            promotion.percentage = percentage;
            promotion.startDate = startDate;
            promotion.endDate = endDate;
            await promotion.save();
            console.log('Promotion updated:', promotion);
            return promotion;
          } else {
            console.log('Promotion not found');
          }
        } catch (error) {
          console.error(error);
        }
      },
      //updatePromotion(1, 'New Year Sale', 20, new Date('2023-01-01'), new Date('2023-01-10'));
      deletePromotion: async (promotionId) => {
        try {
          const deletedRows = await Promotion.destroy({
            where: { id: promotionId },
          });
          if (deletedRows > 0) {
            return {message: 'Promotion deleted successfully.'};
          }  else {
            return {message: 'Promotion not found.'}
          }       
        } catch (error) {
          console.error(error);
        }
      },
      applyPromotionToProduct: async (productId, promotionId) => {
        try {
            const product = await Product.findByPk(productId);
            const promotion = await Promotion.findByPk(promotionId);
    
            if (!product || !promotion) {
                return { success: false, message: 'Sản phẩm hoặc khuyến mãi không tồn tại' };
            }
    
            const existingLink = await ProductPromotions.findOne({
                where: {
                    productId: productId,
                    promotionId: promotionId
                }
            });
    
            if (existingLink) {
                return { success: false, message: 'Sản phẩm đã được áp dụng khuyến mãi này' };
            }
    
            const apply = await ProductPromotions.create({
                productId: productId,
                promotionId: promotionId
            });
    
            // Áp dụng logic khuyến mãi (ví dụ: giảm giá sản phẩm)
    
            return { infomation: apply, success: true, message: 'Sản phẩm đã được áp dụng khuyến mãi' };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Internal Server Error' };
        }
      },

}
module.exports = promotionService;