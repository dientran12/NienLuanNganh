const db = require('../models');
const ProductPromotions = db.ProductPromotions;
const Product = db.Product;
const Promotions = db.Promotions;

const productpromotionService = {
       getAllProductPromotions: async () => {
        try {
          const productPromotions = await ProductPromotions.findAll({
            include: [
              {
                model: Product,
              },
              {
                model: Promotions,
              },
            ],
          });
          console.log(productPromotions);
        } catch (error) {
          console.error(error);
        }
      },
      getProductPromotionsByPromotionId: async (promotionId) => {
        try {
          const productPromotions = await ProductPromotions.findAll({
            where: { promotionId: promotionId },
            include: [
              {
                model: Product,
              },
            ],
          });
          console.log(productPromotions);
        } catch (error) {
          console.error(error);
        }
      },
      getProductPromotionsByProductId: async (productId) => {
        try {
          const productPromotion = await ProductPromotions.findOne({
            where: {
              productId: productId,
            },
          });
          return productPromotion;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      addProductToPromotion: async (productId, promotionId) => {
        try {
          const newProductPromotion = await ProductPromotions.create({
            productId: productId,
            promotionId: promotionId,
          });
          console.log('Product added to promotion:', newProductPromotion);
        } catch (error) {
          console.error(error);
        }
      },
      removeProductPromotion: async (productPromotionId) => {//xóa áp dụng khuyến mãi
        try {
          const removedProductPromotion = await ProductPromotions.destroy({
            where: { id: productPromotionId },
          });
          console.log('Product promotion removed:', removedProductPromotion);
        } catch (error) {
          console.error(error);
        }
      }      
}
module.exports = productpromotionService;