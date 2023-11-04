const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../models/index');
const productPromotionService = require('../services/productPromotionService');
const promotionService = require('../services/promotionService');
const versionService = require('./versionService');
const Category = db.Categories;
const CategoryProducts = db.CategoryProducts;
const Product = db.Product;
const SizeItem = db.SizeItem;
const Color = db.Color;
const Version = db.Versions;
const Promotion = db.Promotions;
const Review = db.Review;
const ProductPromotions = db.ProductPromotions;
const currentDate = new Date();
const sequelize = new Sequelize('db-hkt-d-shop', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+07:00',
  "logging": false
});

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
          'id',
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
      const products = await Product.findAll({
        where: {
          type: {
            [Op.like]: `%${type.replace(/\s/g, '')}%`,
          }
        },
        include: [
          {
            model: Version,
            where: {
                productId:  Sequelize.col('Product.id') 
            }
          },
          {
            model: Promotion,
            attributes: ['id','name', 'percentage', 'startDate', 'endDate'],
            through: {
              model: ProductPromotions,
              attributes: []
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
        ]        
        });        
      
        const productsWithDiscountedPrice = products.map(product => {
          const hasPromotion = product.Promotions && product.Promotions.length > 0;
          const discountPercentage = hasPromotion ? product.Promotions[0].percentage : 0;
          const discountedPrice = hasPromotion
            ? product.price - (product.price * (discountPercentage / 100))
            : null; // Nếu không có khuyến mãi, discountedPrice sẽ là null
    
          return {
            id: product.id,
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
      throw error;
    }
  },
 
  getByName: async (name) => {
    try {
      const products = await Product.findAll({
          where: {
              name: {
                  [Op.like]: `%${name}%`
              }
          },          
          include: [
            {
              model: Version,
              where: {
                  productId:  Sequelize.col('Product.id') 
              }
            },
            {
              model: Promotion,
              attributes: ['id','name', 'percentage', 'startDate', 'endDate'],
              through: {
                model: ProductPromotions,
                attributes: []
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
          ]        
          });        
        
          const productsWithDiscountedPrice = products.map(product => {
            const hasPromotion = product.Promotions && product.Promotions.length > 0;
            const discountPercentage = hasPromotion ? product.Promotions[0].percentage : 0;
            const discountedPrice = hasPromotion
              ? product.price - (product.price * (discountPercentage / 100))
              : null; // Nếu không có khuyến mãi, discountedPrice sẽ là null
      
            return {
              id: product.id,
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
        throw error;
    }
  },
  getAllProducts: async () => {
    try {
      const currentDate = new Date();
      const products = await Product.findAll({        
        include: [
          {
            model: Version,     
          },
          {
            model: Promotion,
            attributes: ['id','name', 'percentage', 'startDate', 'endDate'],
            through: {
              model: ProductPromotions,
              attributes: []
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
        ]        
        });        
      
        const productsWithDiscountedPrice = products.map(product => {
          const hasPromotion = product.Promotions && product.Promotions.length > 0;
          const discountPercentage = hasPromotion ? product.Promotions[0].percentage : 0;
          const discountedPrice = hasPromotion
            ? product.price - (product.price * (discountPercentage / 100))
            : null; // Nếu không có khuyến mãi, discountedPrice sẽ là null
    
          return {
            id: product.id,
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
            model: Version,            
            where: {
                productId:  Sequelize.col('Product.id') 
            }
          },
          {
            model: Promotion,
            attributes: ['id','name', 'percentage', 'startDate', 'endDate'],
            through: {
              model: ProductPromotions,
              attributes: []
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
          id: product.id,
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
  
  getProductById: async (id) => {
    try {
      const currentDate = new Date();
      const product = await Product.findByPk(id, {
        include: [
          {
            model: Version,            
            include: [              
              {
                model: Color,
                attributes: ['id', 'colorName'],
              },                         
            ],
          },          
          {
            model: Review,
            attributes: ['id', 'comment', 'rating'],
          },       
          {
            model: Promotion,
            attributes: ['id','name', 'percentage', 'startDate', 'endDate'],
            through: {
              model: ProductPromotions,
              attributes: []
            },
          },
          {
            model: Category, // Thêm mối quan hệ với danh mục sản phẩm
            attributes: ['id', 'categoryName'], // Chọn các thuộc tính bạn muốn hiển thị từ danh mục sản phẩm
          },
          
        ],
      });
  
      if (product) {                      
        const productpromotion = await productPromotionService.getProductPromotionsByProductId(product.id);        
        if (productpromotion){                
          const percent = await promotionService.getPromotionById(productpromotion.id);
          if (percent){
            if (percent.startDate <= currentDate && percent.endDate >= currentDate ){
              product.dataValues.promotionName = percent.name;
              const discount = percent.percentage;
              const discountedPrice = product.price - (product.price * (discount / 100));
              product.dataValues.discountedPrice = discountedPrice;
            }        
          } 
        } else {
          product.dataValues.promotionName = null;
          product.dataValues.discountedPrice = 0;
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
  deleteProductById: async (id) => {
    try {
      const product = await Product.findByPk(id);

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
  updateProductAndCategories: async (productId, productData, categoryIds) => {
    const t = await sequelize.transaction(); // Bắt đầu một giao dịch mới

    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        // Xóa tất cả các liên kết sản phẩm với danh mục hiện tại
        await CategoryProducts.destroy({
            where: {
                productId: productId
            },
            transaction: t
        });

        // Cập nhật thông tin sản phẩm
        await product.update(productData, { transaction: t });

        // Thêm liên kết mới cho sản phẩm và danh mục
        const newCategoryLinks = categoryIds.map(categoryId => {
            return {
                productId: productId,
                categoryId: categoryId
            };
        });

        await CategoryProducts.bulkCreate(newCategoryLinks, { transaction: t });

        // Commit giao dịch nếu mọi thứ thành công
        await t.commit();

        return product;
    } catch (error) {
        // Rollback giao dịch nếu có lỗi
        await t.rollback();
        throw error;
    }
  },

  getPricesLowToHigh: async () => {
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
          'id',
          'name',
          'description',
          'origin',
          'brand',
          'type',
          'gender',
          'price',
          [Sequelize.literal('CASE WHEN Promotions.percentage IS NOT NULL THEN price - (price * Promotions.percentage / 100) ELSE NULL END'), 'discountedPrice']
        ],
        order: [['price', 'asc']], // Sắp xếp theo giá tăng dần hoặc giảm dần
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

  getPricesHighToLow: async () => {
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
          'id',
          'name',
          'description',
          'origin',
          'brand',
          'type',
          'gender',
          'price',
          [Sequelize.literal('CASE WHEN Promotions.percentage IS NOT NULL THEN price - (price * Promotions.percentage / 100) ELSE NULL END'), 'discountedPrice']
        ],
        order: [['price', 'desc']], // Sắp xếp theo giá tăng dần hoặc giảm dần
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
  getTotalQuantityForProduct: async (productId) => {
    try {
      // Tìm sản phẩm theo id
      const product = await Product.findByPk(productId, {
        include: [{
          model: Version,
          include: [
            SizeItem,
          ]          
        }],
      });
  
      // Nếu sản phẩm không tồn tại, trả về 0
      if (!product) {
        return 0;
      }
  
      // // Sử dụng Sequelize để tính tổng số lượng từ các chi tiết sản phẩm
      // const totalQuantity = await SizeItem.sum('quantity', {
      //   where: {
      //     versionId: Version.id,
      //   },
      // });
  
      return product;
    } catch (error) {
      // Xử lý lỗi nếu cần thiết
      throw error;
    }
  },

  getQuantityVersion: async (productId, sizeId, colorId) => {
    try {
      // Sử dụng Sequelize để tính tổng số lượng từ các chi tiết sản phẩm
      const totalQuantity = await Version.sum('quantity', {
        where: {
          productId: productId,
          sizeId: sizeId,
          colorId: colorId,
        },
      });
  
      return totalQuantity;
    } catch (error) {
      // Xử lý lỗi nếu cần thiết
      throw error;
    }
  },

  getAllUniqueTypes: async () => {
    try {
      const uniqueTypes = await Product.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('type')), 'type'] // Lấy giá trị duy nhất từ cột 'type'
        ],
      });

      const typeValues = uniqueTypes
        .map(type => type.type !== null ? type.type : null)
        .filter(type => type !== null);
      return typeValues;
    } catch (error) {
      console.error('Error fetching unique types:', error);
      throw error;
    }
  },
  
  getAllUniqueBrand: async () => {
    try {
      const uniqueBrand = await Product.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('brand')), 'brand'] // Lấy giá trị duy nhất từ cột 'brand'
        ],
      });

      const BrandValues = uniqueBrand?.map(brand => brand.brand !== null ? brand.brand : null)
        ?.filter(brand => brand !== null);
      return BrandValues;
    } catch (error) {
      console.error('Error fetching unique brands:', error);
      throw error;
    }
  },

  getAllUniqueOrigin: async () => {
    try {
      const uniqueOrigin = await Product.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('origin')), 'origin'] // Lấy giá trị duy nhất từ cột 'origin'
        ],
      });

      const OriginValues = uniqueOrigin.map(origin => origin.origin !== null ? origin.origin : null)
        .filter(origin => origin !== null);
      return OriginValues;
    } catch (error) {
      console.error('Error fetching unique origins:', error);
      throw error;
    }
  }
    
};
  

module.exports = productService;
