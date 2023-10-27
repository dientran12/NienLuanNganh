const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../models/index');
const productDetailService = require('../services/productDetailService');
const Product = db.Product;
const Size = db.Size;
const Color = db.Color;
const ProductDetail = db.ProductDetail;
const Promotion = db.Promotions;
const Review = db.Review;
const ProductPromotions = db.ProductPromotions;

const productService = {
  findProductsByPriceRange: async (minPrice, maxPrice) => {
    try {
      const products = await Product.findAll({
        where: {
          price: {
            [Op.between]: [minPrice, maxPrice],
          },
        },
        include: [
          {
            model: Promotion,
            through: 'productpromotions',
            where: {
              startDate: { [Op.lte]: Sequelize.literal('CURRENT_TIMESTAMP') },
              endDate: { [Op.gte]: Sequelize.literal('CURRENT_TIMESTAMP') }
            }
          }
        ],
        attributes: [
          'idProduct',
          'name',
          'description',
          'origin',
          'brand',
          'type',
          'gender',
          'price',
          [Sequelize.literal('CASE WHEN Promotions.percentage IS NOT NULL THEN price - (price * Promotions.percentage / 100) ELSE NULL END'), 'discountedPrice']
        ],
        include: [
          {
            model: Promotion,
            through: 'productpromotions',
            attributes: [] // Chỉ cần kết hợp để lấy ra các sản phẩm không có khuyến mãi, không cần lấy các trường từ bảng Promotion
          }
        ]
      });

      return products;
    } catch (error) {
      throw error;
    }
  },
  getByType: async (type) => {
    try {
      const productsWithDiscount = await Product.findAll({
        where: {
          type: {
            [Op.like]: `%${type.replace(/\s/g, '')}%`,
          }
        },
        include: [
          {
            model: Promotion,
            through: 'productpromotions',
            where: {
              startDate: { [Op.lte]: Sequelize.literal('CURRENT_TIMESTAMP') },
              endDate: { [Op.gte]: Sequelize.literal('CURRENT_TIMESTAMP') }
            }
          }
        ],
        attributes: [
          'idProduct',
          'name',
          'description',
          'origin',
          'brand',
          'type',
          'gender',
          'price',
          [Sequelize.literal('CASE WHEN Promotions.percentage IS NOT NULL THEN price - (price * Promotions.percentage / 100) ELSE NULL END'), 'discountedPrice']
        ],
        include: [
          {
            model: Promotion,
            through: 'productpromotions',
            attributes: [] // Chỉ cần kết hợp để lấy ra các sản phẩm không có khuyến mãi, không cần lấy các trường từ bảng Promotion
          }
        ]
      });
      
      return productsWithDiscount;
    } catch (error) {
      throw error;
    }
  },
 
  getByName: async (name) => {
    try {
      const productsWithDiscount = await Product.findAll({
          where: {
              name: {
                  [Op.like]: `%${name}%`
              }
          },
          include: [
            {
              model: Promotion,
              through: 'productpromotions',
              where: {
                startDate: { [Op.lte]: Sequelize.literal('CURRENT_TIMESTAMP') },
                endDate: { [Op.gte]: Sequelize.literal('CURRENT_TIMESTAMP') }
              }
            }
          ],
          attributes: [
            'idProduct',
            'name',
            'description',
            'origin',
            'brand',
            'type',
            'gender',
            'price',
            [Sequelize.literal('CASE WHEN Promotions.percentage IS NOT NULL THEN price - (price * Promotions.percentage / 100) ELSE NULL END'), 'discountedPrice']
          ],
          include: [
            {
              model: Promotion,
              through: 'productpromotions',
              attributes: [] // Chỉ cần kết hợp để lấy ra các sản phẩm không có khuyến mãi, không cần lấy các trường từ bảng Promotion
            }
          ]
        });

      return productsWithDiscount;
  } catch (error) {
      throw error;
  }
  },
  getAllProducts: async () => {
    try {
      const productsWithDiscount = await Product.findAll({
        include: [
          {
            model: Promotion,
            through: 'productpromotions',
            where: {
              startDate: { [Op.lte]: Sequelize.literal('CURRENT_TIMESTAMP') },
              endDate: { [Op.gte]: Sequelize.literal('CURRENT_TIMESTAMP') }
            }
          }
        ],
        attributes: [
          'idProduct',
          'name',
          'description',
          'origin',
          'brand',
          'type',
          'gender',
          'price',
          [Sequelize.literal('CASE WHEN Promotions.percentage IS NOT NULL THEN price - (price * Promotions.percentage / 100) ELSE NULL END'), 'discountedPrice']
        ],
        include: [
          {
            model: Promotion,
            through: 'productpromotions',
            attributes: [] // Chỉ cần kết hợp để lấy ra các sản phẩm không có khuyến mãi, không cần lấy các trường từ bảng Promotion
          }
        ]
      });
      
      return productsWithDiscount;
    } catch (error) {
      throw error;
    }
  },

  getProductsOnpage: async (page = 1, pageSize = 10) => {
    try {
      const offset = (page - 1) * pageSize;
      const currentDate = new Date();
      const products = await Product.findAll({
        include: [
          {
            model: Promotion,
            through: {
              model: ProductPromotions,
            },
            required: false, // Sử dụng left join thay vì inner join
            where: {
              [Op.or]: [
                {
                  '$Promotions.startDate$': { [Op.lte]: currentDate },
                  '$Promotions.endDate$': { [Op.gte]: currentDate },
                },
                {
                  '$Promotions.startDate$': { [Op.is]: null },
                  '$Promotions.endDate$': { [Op.is]: null },
                },
              ],
            },
          },
        ],
        offset: offset,
        limit: pageSize,
      });
  
      const productsWithDiscountedPrice = products.map(product => {
        const hasPromotion = product.Promotions && product.Promotions.length > 0;
        const discountPercentage = hasPromotion ? product.Promotions[0].percentage : 0;
        const discountedPrice = hasPromotion
          ? product.price - (product.price * (discountPercentage / 100))
          : null; // Nếu không có khuyến mãi, discountedPrice sẽ là null
  
        return {
          id: product.idProduct,
          name: product.name,
          description: product.description,
          origin: product.origin,
          brand: product.brand,
          type: product.type,
          gender: product.gender, 
          price: product.price,
          hasPromotion: hasPromotion ? discountPercentage : null,
          discountedPrice: discountedPrice,
        };
      });
  
      return productsWithDiscountedPrice;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  
  getProductById: async (idProduct) => {
    try {
      const product = await Product.findByPk(idProduct, {
        include: [
          {
            model: ProductDetail,
            as: 'Details',
            include: [
              {
                model: Size,
                attributes: ['idSize', 'sizeName'],
              },
              {
                model: Color,
                attributes: ['idColor', 'colorName'],
              },
            ],
          },
          {
            model: Review,
            attributes: ['idReview', 'comment', 'rating'],
          },          
          {
            model: Promotion, // Liên kết với bảng Promotion nếu sản phẩm tham gia chương trình khuyến mãi
            through: {
              model: ProductPromotions,
              as: 'productPromotions',
            },
          },
        ],
      });
  
      if (product) {
        // Kiểm tra xem sản phẩm có tham gia vào chương trình khuyến mãi không
        if (product.productPromotions && product.productPromotions.length > 0) {
          // Nếu sản phẩm có khuyến mãi, lấy thông tin về chương trình khuyến mãi từ Promotion
          const promotion = product.productPromotions[0];
          product.dataValues.promotionName = promotion.Promotion.promotionName; // Thêm trường promotionName vào kết quả trả về
          product.dataValues.promotionPercentage = promotion.ProductPromotion.percentage; // Thêm trường promotionPercentage vào kết quả trả về
        } else {
          // Nếu sản phẩm không có khuyến mãi, đặt giá trị của promotionName và promotionPercentage là null
          product.dataValues.promotionName = null;
          product.dataValues.promotionPercentage = 0;
        }
        return product;
      } else {
        throw new Error('Product not found.');
      }
    } catch (error) {
      throw new Error('Error getting product: ' + error.message);
    }
  },
  
  createProduct: async (name, description, type, price, origin, brand, gender) => {
    try {
      const newProduct = await Product.create({ name, description, type, price, origin, brand, gender });
      return { success: true, product: newProduct };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal Server Error' };
    }
  },
  deleteProductById: async (idProduct) => {
    try {
      const product = await Product.findByPk(idProduct);

      if (product) {
        await product.destroy();
        return { success: true, message: 'Sản phẩm đã được xóa thành công' };
      } else {
        return { success: false, message: 'Không tìm thấy sản phẩm để xóa' };
      }
    } catch (error) {
      throw error;
    }
  },
  async updateProductAndRelatedInfo(productId, productData) {
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      
      // Cập nhật thông tin sản phẩm
      await product.update(productData);       
      return product;
    } catch (error) {
      throw error;
    }
  },

  // async updateColorsAndSizes(product, colors, sizes, quantities) {
  //   // Xử lý logic để cập nhật thông tin màu sắc, size và số lượng trong kho    
  //   // Ví dụ: Tạo hoặc cập nhật thông tin trong bảng ProductDetail
  //   for (let i = 0; i < colors.length; i++) {
  //     const colorId = colors[i].id;
  //     const sizeId = sizes[i].id;
  //     const quantity = quantities[i];

  //     let productDetail = await ProductDetail.findOne({
  //       where: {
  //         productId: product.id,
  //         colorId: colorId,
  //         sizeId: sizeId,
  //       },
  //     });

  //     if (productDetail) {
  //       // Nếu productDetail đã tồn tại, cập nhật số lượng
  //       productDetail.quantity = quantity;
  //       await productDetail.save();
  //     } else {
  //       // Nếu productDetail chưa tồn tại, tạo mới và thêm số lượng
  //       await ProductDetail.create({
  //         productId: product.id,
  //         colorId: colorId,
  //         sizeId: sizeId,
  //         quantity: quantity,
  //       });
  //     }
  //   }
  // },
  // addSizeAndColorToProduct: async (productId, sizeName, colorName, quantity) => {
  //   try {
  //     // Tìm hoặc tạo mới size và color
  //     const [size, createdSize] = await Size.findOrCreate({
  //       where: { sizeName: sizeName },
  //       defaults: { sizeName: sizeName }
  //     });

  //     const [color, createdColor] = await Color.findOrCreate({
  //       where: { colorName: colorName },
  //       defaults: { colorName: colorName }
  //     });

  //     // Liên kết sản phẩm với size và color thông qua bảng ProductDetail
  //     const productDetail = await ProductDetail.create({
  //       productId: productId,
  //       sizeId: size.idSize,
  //       colorId: color.idColor,
  //       quantity: quantity
  //     });

  //     return { success: true, productDetail };
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('Internal Server Error');
  //   }
  // },
  
  getAllProductsPaginated: async (pageNumber = 1, itemsPerPage = 10) => {
    try {
        const offset = (pageNumber - 1) * itemsPerPage;

        const productsWithDiscount = await Product.findAll({
            limit: itemsPerPage,
            offset: offset,
            include: [
                {
                    model: Promotion,
                    through: 'PromotionProduct',
                    where: {
                        startDate: { [Op.lte]: Sequelize.literal('CURRENT_TIMESTAMP') },
                        endDate: { [Op.gte]: Sequelize.literal('CURRENT_TIMESTAMP') }
                    }
                }
            ],
            attributes: [
                'idProduct',
                'name',
                'description',
                'origin',
                'brand',
                'type',
                'gender',
                'price',
                [Sequelize.literal('CASE WHEN `Promotions->ProductPromotion`.`percentage` IS NOT NULL THEN `Product`.`price` - (`Product`.`price` * `Promotions->ProductPromotion`.`percentage` / 100) ELSE NULL END'), 'discountedPrice']
            ],
            include: [
                {
                    model: Promotion,
                    through: 'PromotionProduct',
                    attributes: [] // Chỉ cần kết hợp để lấy ra các sản phẩm không có khuyến mãi, không cần lấy các trường từ bảng Promotion
                }
            ]
        });

        const totalItems = await Product.count({
            include: [
                {
                    model: Promotion,
                    through: 'PromotionProduct',
                    where: {
                        startDate: { [Op.lte]: Sequelize.literal('CURRENT_TIMESTAMP') },
                        endDate: { [Op.gte]: Sequelize.literal('CURRENT_TIMESTAMP') }
                    }
                }
            ]
        });

        const totalPages = Math.ceil(totalItems / itemsPerPage);

        return {
            products: productsWithDiscount,
            currentPage: pageNumber,
            totalPages: totalPages,
            totalItems: totalItems
        };
    } catch (error) {
        throw error;
    }
} 

};
  

module.exports = productService;
