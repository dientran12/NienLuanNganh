const db = require('../models/index');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const Promotion = db.Promotions;
const Product = db.Product;
const ProductPromotions = db.ProductPromotions;
const Version = db.Versions;

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

    getPromotionById:  async (id) => {
      try {
        const promotion = await Promotion.findByPk(id);
        if (promotion) {
          return promotion;
        } else {
          throw new Error('Promotion not found.');
        }
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
    
        // Kiểm tra xem có khuyến mãi nào có cùng tên tồn tại không
        const existingPromotion = await Promotion.findOne({ where: { name } });
        if (existingPromotion) {
          throw new Error("Khuyến mãi đã tồn tại với tên này.");
        }
    
        // Tạo mới promotion nếu tất cả đối số hợp lệ và không có trùng tên
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
            return { success: true, promotion }; // Trả về giá trị success và promotion
          } else {
            return { success: false, message: 'Promotion not found.' };
          }
        } catch (error) {
          console.error(error);
          return { success: false, message: 'Internal Server Error' };
        }
      },
      //updatePromotion(1, 'New Year Sale', 20, new Date('2023-01-01'), new Date('2023-01-10'));
      deletePromotion: async (promotionId) => {
        try {
          const deletedRows = await Promotion.destroy({
            where: { id: promotionId },
          });
          if (deletedRows > 0) {
            return {success: true, message: 'Promotion deleted successfully.'};
          }  else {
            return {success: false, message: 'Promotion not found.'}
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
      
          // Tìm thông tin khuyến mãi cũ của sản phẩm
          const existingLink = await ProductPromotions.findOne({
            where: {
              productId: productId,
            },
            include: [
              {
                model: Promotion,
              },
            ],
          });
      
          // Nếu sản phẩm đã được áp dụng khuyến mãi trước đó
          if (existingLink) {
            const oldPromotion = existingLink.Promotion;
            // Nếu đã có khuyến mãi này trước đó
            if (oldPromotion && oldPromotion.id == promotionId) {
              return {
                success: false,
                message: 'Sản phẩm đã được áp dụng khuyến mãi này trước đó.',
                oldPromotion: oldPromotion,
              };
            } else {
              // Nếu sản phẩm đã có khuyến mãi khác, thực hiện cập nhật khuyến mãi mới
              await existingLink.update({ promotionId: promotionId });
              return {
                success: true,
                message: 'Sản phẩm đã được cập nhật khuyến mãi thành công.',
                oldPromotion: oldPromotion,
                newPromotion: promotion,
              };
            }
          }
      
          // Nếu sản phẩm chưa được áp dụng khuyến mãi trước đó
          const apply = await ProductPromotions.create({
            productId: productId,
            promotionId: promotionId,
          });
      
          return { success: true, message: 'Áp dụng khuyến mãi cho sản phẩm thành công.' };
        } catch (error) {
          console.error(error);
          return { success: false, message: 'Internal Server Error' };
        }
      },
    
      getProductsByPromotion: async (id) => {
        try {
          const promotion = await Promotion.findByPk(id);
      
          if (!promotion) {
            return { success: false, message: 'Khuyến mãi không tồn tại' };
          }
      
          const currentDate = new Date();
          const products = await promotion.getProducts({
            include: [
              {
                model: Version,
                attributes: ['id', 'productId', 'colorId', 'image'],
                order: [['createdAt', 'ASC']],
                separate: true,
                required: false,
              },
              {
                model: Promotion,
                attributes: ['name', 'percentage'],
                through: {
                  model: ProductPromotions,
                  attributes: [],
                },
                required: false,
                where: {
                  startDate: { [Op.lte]: currentDate },
                  endDate: { [Op.gte]: currentDate },
                },
              },
            ],
          });
      
          // Transform the products array to calculate discounted price and add image
          const productsWithDetails = products.map((product) => {
            const productJson = product.get({ plain: true });
            delete productJson.CategoryProducts; // Xóa thông tin CategoryProducts
      
            const hasPromotion = product.Promotions && product.Promotions.length > 0;
            const discountPercentage = hasPromotion ? product.Promotions[0].percentage : null;
            const discountedPrice = hasPromotion
              ? product.price - (product.price * (discountPercentage / 100))
              : null;
      
            const firstVersionImage = product.Versions[0]?.image || null;
      
            return {
              ...productJson,
              discountPercentage: hasPromotion ? discountPercentage : null,
              discountedPrice,
              image: firstVersionImage,
              Versions: product.Versions || [],
            };
          });
      
          return { success: true, products: productsWithDetails };
        } catch (error) {
          console.error(error);
          return { success: false, message: 'Lỗi Server Nội bộ' };
        }
      },    

}
module.exports = promotionService;