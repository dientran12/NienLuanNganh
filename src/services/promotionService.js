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

    getPromotionById: async (id) => {
      try {
        const promotion = await Promotion.findByPk(id);
        if (!promotion) {
          return { success: false, message: 'Promotion not found.' };
        }
    
        // Định dạng ngày theo dd/mm/yyyy
        const startDateFormatted = promotion.startDate 
          ? new Date(promotion.startDate).toLocaleDateString('en-GB') 
          : null;
        const endDateFormatted = promotion.endDate 
          ? new Date(promotion.endDate).toLocaleDateString('en-GB') 
          : null;
    
        // Trả về đối tượng promotion với ngày đã được định dạng
        return {
          success: true,
          promotion: {
            ...promotion.get({ plain: true }),
            startDate: startDateFormatted,
            endDate: endDateFormatted,
          }
        };
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    createPromotion: async (name, percentage, description, startDate, endDate) => {
      try {
        // Kiểm tra tính hợp lệ của các đối số trước khi tạo promotion
        if (!name) {
          throw new Error("Tên khuyến mãi là bắt buộc.");
        }
        if (percentage === undefined || percentage < 0 || percentage > 100) {
          throw new Error("Phần trăm khuyến mãi phải là một số từ 0 đến 100.");
        }        
        if (!startDate) {
          throw new Error("Ngày bắt đầu khuyến mãi là bắt buộc.");
        }
        if (!endDate) {
          throw new Error("Ngày kết thúc khuyến mãi là bắt buộc.");
        }
        if (new Date(startDate) >= new Date(endDate)) {
          throw new Error("Ngày bắt đầu phải trước ngày kết thúc.");
        }
        
        // Tạo mới promotion nếu tất cả đối số hợp lệ
        const newPromotion = await Promotion.create({
          name,
          percentage,
          startDate,
          endDate,
          description,
        });
        console.log('New promotion created:', newPromotion);
        return newPromotion;
      } catch (error) {
        console.error(error.message);
        return { error: error.message }; // Trả về thông báo lỗi
      }
    },    

      //createPromotion('Special Sale', 15, new Date(), new Date('2023-12-31'));
      updatePromotion: async (id, name, percentage, description, startDate, endDate) => {
        try {
          const promotion = await Promotion.findByPk(id);
          if (promotion) {
            promotion.name = name;
            promotion.percentage = percentage;
            promotion.startDate = startDate;
            promotion.endDate = endDate;
            promotion.description = description;
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
                    productId: productId                    
                }
            });
    
            if (existingLink) {
                const id = existingLink.promotionId;
                const applyPromotion = await Promotion.findByPk(id);
                return { success: false, message: 'Sản phẩm này đã được áp dụng khuyến mãi.', Detail: applyPromotion };
            }
    
            const apply = await ProductPromotions.create({
                productId: productId,
                promotionId: promotionId
            });
    
            // Áp dụng logic khuyến mãi (ví dụ: giảm giá sản phẩm)
    
            return { infomation: apply, success: true, message: 'Áp dụng khuyến mãi cho sản phẩm thành công.' };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Internal Server Error' };
        }
      },

}
module.exports = promotionService;