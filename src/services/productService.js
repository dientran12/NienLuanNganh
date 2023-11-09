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
  getByOrigin: async (origin) => {
    try {
      const products = await Product.findAll({
        where: {
          origin: {
            [Op.like]: `%${origin}%`,
          }
        },
        include: [
          {
            model: Version,
            attribute: ['id', 'colorId', 'productId', 'image'],
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
            Version: product.Versions,
            hasPromotion: hasPromotion ? discountPercentage : null,
            discountedPrice: discountedPrice,
          };
        });

        return productsWithDiscountedPrice;
    } catch (error) {
      throw error;
    }
  },

  getByOriginHaveImage: async (origin) => {
    try {
      const currentDate = new Date();
      const products = await Product.findAll({
        where: {
          origin: {
            [Op.like]: `%${origin}%`, // Tìm kiếm theo xuất xứ sản phẩm
          }
        },
        include: [
          {
            model: Version,
            attributes: ['id', 'colorId', 'productId', 'image'],
            order: [['createdAt', 'ASC']],
            separate: true, // Để đảm bảo áp dụng order
            required: false // Đảm bảo rằng không cần Version để trả về sản phẩm
          },
          {
            model: Promotion,
            attributes: ['id', 'name', 'percentage', 'startDate', 'endDate'],
            through: {
              model: ProductPromotions,
              attributes: []
            },
            required: false,
            where: {
              [Op.or]: [
                {
                  startDate: { [Op.lte]: currentDate },
                  endDate: { [Op.gte]: currentDate },
                },
                {
                  startDate: { [Op.is]: null },
                  endDate: { [Op.is]: null },
                },
              ],
            },
          },
        ]
      });        
  
      const productsWithDetails = products.map(product => {
        const hasPromotion = product.Promotions && product.Promotions.length > 0;
        const discountPercentage = hasPromotion ? product.Promotions[0].percentage : null;
        const discountedPrice = hasPromotion
          ? product.price - (product.price * (discountPercentage / 100))
          : null; 
  
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          origin: product.origin,
          brand: product.brand,
          type: product.type,
          gender: product.gender,
          price: product.price,
          image: product.Versions[0]?.image || null, // Sử dụng optional chaining để lấy ảnh
          Versions: product.Versions || [], // Trả về mảng rỗng nếu không có Versions
          hasPromotion: hasPromotion ? discountPercentage : null,
          discountedPrice,
        };
      });
  
      return productsWithDetails;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },    

  getByBrand: async (brand) => {
    try {
      const products = await Product.findAll({
        where: {
          brand: {
            [Op.like]: `%${brand}%`,
          }
        },
        include: [
          {
            model: Version,
            attribute: ['id', 'colorId', 'productId', 'image'],
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
            Version: product.Versions,
            hasPromotion: hasPromotion ? discountPercentage : null,
            discountedPrice: discountedPrice,
          };
        });

        return productsWithDiscountedPrice;
    } catch (error) {
      throw error;
    }
  },

  getByBrandHaveImage: async (brand) => {
    try {
      const currentDate = new Date();
      const products = await Product.findAll({
        where: {
          brand: {
            [Op.like]: `%${brand}%`, 
          }
        },
        include: [
          {
            model: Version,
            attributes: ['id', 'colorId', 'productId', 'image'],
            order: [['createdAt', 'ASC']],
            separate: true, // Đảm bảo áp dụng order
            required: false // Đảm bảo rằng không cần Version để trả về sản phẩm
          },
          {
            model: Promotion,
            attributes: ['id', 'name', 'percentage', 'startDate', 'endDate'],
            through: {
              model: ProductPromotions,
              attributes: []
            },
            required: false,
            where: {
              [Op.or]: [
                {
                  startDate: { [Op.lte]: currentDate },
                  endDate: { [Op.gte]: currentDate },
                },
                {
                  startDate: { [Op.is]: null },
                  endDate: { [Op.is]: null },
                },
              ],
            },
          },
        ]
      });
  
      const productsWithDetails = products.map(product => {
        const hasPromotion = product.Promotions && product.Promotions.length > 0;
        const discountPercentage = hasPromotion ? product.Promotions[0].percentage : null;
        const discountedPrice = hasPromotion
          ? product.price - (product.price * (discountPercentage / 100))
          : null;
  
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          origin: product.origin,
          brand: product.brand,
          type: product.type,
          gender: product.gender,
          price: product.price,
          image: product.Versions[0]?.image || null, // Sử dụng optional chaining để lấy ảnh
          Versions: product.Versions || [], // Trả về mảng rỗng nếu không có Versions
          hasPromotion: hasPromotion ? discountPercentage : null,
          discountedPrice,
        };
      });
  
      return productsWithDetails;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, 

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
            [Op.like]: `%${type}%`,
          }
        },
        include: [
          {
            model: Version,
            attribute: ['id', 'colorId', 'productId', 'image'],
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
            Versions: product.Versions || [],
            hasPromotion: hasPromotion ? discountPercentage : null,
            discountedPrice: discountedPrice,
          };
        });

        return productsWithDiscountedPrice;
    } catch (error) {
      throw error;
    }
  },

  getByTypeHaveImage: async (type) => {
    try {
      const currentDate = new Date();
      const products = await Product.findAll({
        where: {
          type: {
            [Op.like]: `%${type}%`, 
          }
        },
        include: [
          {
            model: Version,
            attributes: ['id', 'colorId', 'productId', 'image'],
            order: [['createdAt', 'ASC']],
            separate: true, // Đảm bảo áp dụng order
            required: false // Đảm bảo rằng không cần Version để trả về sản phẩm
          },
          {
            model: Promotion,
            attributes: ['id', 'name', 'percentage', 'startDate', 'endDate'],
            through: {
              model: ProductPromotions,
              attributes: []
            },
            required: false,
            where: {
              [Op.or]: [
                {
                  startDate: { [Op.lte]: currentDate },
                  endDate: { [Op.gte]: currentDate },
                },
                {
                  startDate: { [Op.is]: null },
                  endDate: { [Op.is]: null },
                },
              ],
            },
          },
        ]
      });
  
      const productsWithDetails = products.map(product => {
        const hasPromotion = product.Promotions && product.Promotions.length > 0;
        const discountPercentage = hasPromotion ? product.Promotions[0].percentage : null;
        const discountedPrice = hasPromotion
          ? product.price - (product.price * (discountPercentage / 100))
          : null;
  
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          origin: product.origin,
          brand: product.brand,
          type: product.type,
          gender: product.gender,
          price: product.price,
          image: product.Versions[0]?.image || null, // Sử dụng optional chaining để lấy ảnh
          Versions: product.Versions || [], // Trả về mảng rỗng nếu không có Versions
          hasPromotion: hasPromotion ? discountPercentage : null,
          discountedPrice,
        };
      });
  
      return productsWithDetails;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },    
 
  getByName: async (name) => {
    try {
      if (!name) {
        throw new Error;
      }
      const products = await Product.findAll({
          where: {
              name: {
                  [Op.like]: `%${name}%`
              }
          },          
          include: [
            {
              model: Version,
              attribute: ['id', 'colorId', 'productId', 'image'],
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
              Versions: product.Versions || [],
              hasPromotion: hasPromotion ? discountPercentage : null,
              discountedPrice: discountedPrice,
            };
          });

          return productsWithDiscountedPrice;

    } catch (error) {
        throw error;
    }
  },

  getByNameWithImage: async (name) => {
    try {
      if (!name) {
        throw new Error;
      }
      const currentDate = new Date();
      const products = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        },          
        include: [
          {
            model: Version,
            attribute: ['id', 'colorId', 'productId', 'image'],
            limit: 1,
            order: [['createdAt', 'ASC']],
            separate: true // Để đảm bảo lấy đúng phiên bản đầu tiên
          },
          {
            model: Promotion,
            attributes: ['id', 'name', 'percentage', 'startDate', 'endDate'],
            through: {
              model: ProductPromotions,
              attributes: []
            },
            required: false,
            where: {
              [Op.or]: [
                {
                  startDate: { [Op.lte]: currentDate },
                  endDate: { [Op.gte]: currentDate },
                },
                {
                  startDate: { [Op.is]: null },
                  endDate: { [Op.is]: null },
                },
              ],
            },
          },
        ]
      });        
  
      const productsWithDetails = products.map(product => {
        const hasPromotion = product.Promotions && product.Promotions.length > 0;
        const discountPercentage = hasPromotion ? product.Promotions[0].percentage : 0;
        const discountedPrice = hasPromotion
          ? product.price - (product.price * (discountPercentage / 100))
          : null; 
  
        const image = product.Versions.length > 0 ? product.Versions[0].image : null;
  
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          origin: product.origin,
          brand: product.brand,
          type: product.type,
          gender: product.gender,
          price: product.price,
          image: image, // Thêm ảnh từ phiên bản đầu tiên
          Version: product.Versions,
          hasPromotion: hasPromotion,
          discountedPrice: discountedPrice,
        };
      });
  
      return productsWithDetails;
  
    } catch (error) {
      console.error(error);
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
            include: [
              {
                model: SizeItem, // Thêm mối quan hệ với SizeItem
                attributes: ['quantity']
              },
            ],           
          },
          {
            model: Promotion,
            attributes: ['id','name', 'percentage', 'startDate', 'endDate'],
            through: {
              model: ProductPromotions,
              attributes: []
            },
            required: false,
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
          : null;
        
        // Tính tổng số lượng từ các phiên bản
        const totalQuantity = product.Versions.reduce((sum, version) => {
          if (version.SizeItems && version.SizeItems.length > 0) {
            const versionQuantity = version.SizeItems.reduce((subSum, sizeItem) => subSum + sizeItem.quantity, 0);
            return sum + versionQuantity;
          }
          return sum;
        }, 0);
  
        // Sắp xếp các Versions theo 'createdAt' và lấy ra image từ phiên bản đầu tiên
        const firstVersionImage = product.Versions && product.Versions.length 
          ? product.Versions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0].image 
          : null;
  
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          origin: product.origin,
          brand: product.brand,
          type: product.type,
          gender: product.gender, 
          price: product.price,
          soldQuantity: product.soldQuantity,
          image: firstVersionImage,
          Versions: product.Versions,
          hasPromotion: hasPromotion ? discountPercentage : null,
          discountedPrice: discountedPrice,
          total: totalQuantity, // Tổng số lượng của sản phẩm
        };
      });
      return productsWithDiscountedPrice;
        
    } catch (error) {
      throw error;
    }
  },

  getAllProductsOld: async () => {
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
        ],
        order: [['createdAt', 'ASC']],        
        });        
      
        const productsWithDiscountedPrice = products.map(product => {
          const hasPromotion = product.Promotions && product.Promotions.length > 0;
          const discountPercentage = hasPromotion ? product.Promotions[0].percentage : 0;
          const discountedPrice = hasPromotion
            ? product.price - (product.price * (discountPercentage / 100))
            : null; // Nếu không có khuyến mãi, discountedPrice sẽ là null
          
          // Sắp xếp các Versions theo 'createdAt' và lấy ra image từ phiên bản đầu tiên
          const firstVersionImage = product.Versions && product.Versions.length 
            ? product.Versions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0].image 
            : null;

          return {
            id: product.id,
            name: product.name,
            description: product.description,
            origin: product.origin,
            brand: product.brand,
            type: product.type,
            gender: product.gender, 
            price: product.price,
            image: firstVersionImage,
            Versions: product.Versions,
            hasPromotion: hasPromotion ? discountPercentage : null,
            discountedPrice: discountedPrice,
          };
        });
        return productsWithDiscountedPrice;
      
    } catch (error) {
      throw error;
    }
  },

  getAllProductsNew: async () => {
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
        ],
        order: [['createdAt', 'DESC']],        
        });        
      
        const productsWithDiscountedPrice = products.map(product => {
          const hasPromotion = product.Promotions && product.Promotions.length > 0;
          const discountPercentage = hasPromotion ? product.Promotions[0].percentage : 0;
          const discountedPrice = hasPromotion
            ? product.price - (product.price * (discountPercentage / 100))
            : null; // Nếu không có khuyến mãi, discountedPrice sẽ là null
          
          // Sắp xếp các Versions theo 'createdAt' và lấy ra image từ phiên bản đầu tiên
          const firstVersionImage = product.Versions && product.Versions.length 
            ? product.Versions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0].image 
            : null;

          return {
            id: product.id,
            name: product.name,
            description: product.description,
            origin: product.origin,
            brand: product.brand,
            type: product.type,
            gender: product.gender, 
            price: product.price,
            image: firstVersionImage,
            Versions: product.Versions,
            hasPromotion: hasPromotion ? discountPercentage : null,
            discountedPrice: discountedPrice,
          };
        });
        return productsWithDiscountedPrice;
      
    } catch (error) {
      throw error;
    }
  },

  getAllProductsCustomer: async () => {
    try {
      const currentDate = new Date();
      const products = await Product.findAll({
        include: [
          {
            model: Version,
            attributes: ['id', 'productId', 'colorId', 'image'],
            limit: 1,
            order: [['createdAt', 'ASC']],
            separate: true 
          },
          {
            model: Promotion,
            attributes: ['id', 'name', 'percentage', 'startDate', 'endDate'],
            through: {
              model: ProductPromotions,
              attributes: []
            },
            required: false,
            where: {
              [Op.or]: [
                {
                  startDate: { [Op.lte]: currentDate },
                  endDate: { [Op.gte]: currentDate },
                },
                {
                  startDate: { [Op.is]: null },
                  endDate: { [Op.is]: null },
                },
              ],
            },
          },
        ]
      });
  
      const productsWithDiscountedPrice = products.map(product => {
        const hasPromotion = product.Promotions && product.Promotions.length > 0;
        const discountPercentage = hasPromotion ? product.Promotions[0].percentage : null;
        const discountedPrice = hasPromotion
          ? product.price - (product.price * (discountPercentage / 100))
          : null;
  
        // Sử dụng optional chaining và nullish coalescing để lấy image một cách an toàn
        const firstVersionImage = product.Versions[0]?.image ?? null;
  
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          origin: product.origin,
          brand: product.brand,
          type: product.type,
          gender: product.gender, 
          price: product.price,
          image: firstVersionImage, // Thêm ảnh từ phiên bản đầu tiên
          Versions: product.Versions,
          hasPromotion,
          discountedPrice, // Giá đã giảm nếu có khuyến mãi, ngược lại là null
        };
      });
  
      return productsWithDiscountedPrice;
  
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal Server Error' };
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
            attributes: ['image'],
            // Không có limit và order ở đây, sẽ xử lý sau khi nhận dữ liệu
          },
          {
            model: Promotion,
            attributes: ['id', 'name', 'percentage', 'startDate', 'endDate'],
            through: {
              model: ProductPromotions,
              attributes: []
            },
            required: false,
            where: {
              [Op.or]: [
                {
                  startDate: { [Op.lte]: currentDate },
                  endDate: { [Op.gte]: currentDate },
                },
                {
                  startDate: { [Op.is]: null },
                  endDate: { [Op.is]: null },
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
          : product.price;
  
        // Lấy ảnh từ phiên bản đầu tiên được sắp xếp theo 'createdAt'
        const firstVersion = product.Versions
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0];
  
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          origin: product.origin,
          brand: product.brand,
          type: product.type,
          gender: product.gender,
          price: product.price,
          image: firstVersion ? firstVersion.image : null,
          hasPromotion,
          discountedPrice,
        };
      });
  
      // Lọc ra những sản phẩm không có Version nào
      return productsWithDiscountedPrice.filter(product => product.image !== null);
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
              {
                model: SizeItem,
              }                         
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
  
  createProduct: async (name, description, type, price, origin, brand, gender, categoryIds) => {
    try {
      // Tạo sản phẩm mới
      const newProduct = await Product.create({ name, description, type, price, origin, brand, gender });
  
      // Kiểm tra xem có danh sách categoryIds để liên kết không
      if (categoryIds && categoryIds.length) {
        // Kiểm tra xem mỗi ID danh mục có tồn tại không
        for (const categoryId of categoryIds) {
          const categoryExists = await Category.findByPk(categoryId);
          if (!categoryExists) {
            // Nếu một trong những ID danh mục không tồn tại, hủy thao tác và thông báo lỗi
            throw new Error(`Category with ID ${categoryId} does not exist.`);
          }
        }
        // Nếu tất cả các ID danh mục đều tồn tại, liên kết sản phẩm với danh mục
        await newProduct.setCategories(categoryIds);
      }
  
      // Tải lại thông tin sản phẩm để lấy cả thông tin liên kết với danh mục
      const productWithCategories = await Product.findByPk(newProduct.id, { include: [Category] });
  
      return { success: true, product: productWithCategories };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message || 'Internal Server Error' };
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
            model: Version,
            attributes: ['image'],
            required: false
          },
          {
            model: Promotion,
            attributes: ['percentage'],
            through: {
              model: ProductPromotions,
              attributes: []
            },
            required: false,
            where: {
              startDate: { [Op.lte]: Sequelize.literal('CURRENT_TIMESTAMP') },
              endDate: { [Op.gte]: Sequelize.literal('CURRENT_TIMESTAMP') },
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
          // Định nghĩa trường tính toán giá đã giảm nếu có, nếu không thì null
          [Sequelize.literal('CASE WHEN Promotions.percentage IS NOT NULL THEN price - (price * Promotions.percentage / 100) ELSE NULL END'), 'discountedPrice']
        ],
        order: [
          [Sequelize.literal('CASE WHEN Promotions.percentage IS NOT NULL THEN price - (price * Promotions.percentage / 100) ELSE price END'), 'ASC']
        ],
      });
    
      const productsWithImages = productsWithDiscount.map(product => {
        // Tìm ảnh đầu tiên trong số các phiên bản
        const firstAvailableImage = product.Versions.find(v => v.image)?.image || null;
    
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          origin: product.origin,
          brand: product.brand,
          type: product.type,
          gender: product.gender,
          price: product.price,
          image: firstAvailableImage, // Thêm ảnh từ phiên bản có ảnh đầu tiên
          hasPromotion: !!product.Promotions.length,
          discountedPrice: product.dataValues.discountedPrice, // Giá đã giảm nếu có, nếu không thì null
          Versions: product.Versions // Vẫn giữ thông tin phiên bản
        };
      });
    
      return productsWithImages;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },    

  getPricesHighToLow: async () => {
    try {
      const productsWithDiscount = await Product.findAll({
        include: [
          {
            model: Version,
            attributes: ['image'],
            required: false
          },
          {
            model: Promotion,
            attributes: ['percentage'],
            through: {
              model: ProductPromotions,
              attributes: []
            },
            required: false,
            where: {
              startDate: { [Op.lte]: Sequelize.literal('CURRENT_TIMESTAMP') },
              endDate: { [Op.gte]: Sequelize.literal('CURRENT_TIMESTAMP') },
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
          // Định nghĩa trường tính toán giá đã giảm nếu có, nếu không thì null
          [Sequelize.literal('CASE WHEN Promotions.percentage IS NOT NULL THEN price - (price * Promotions.percentage / 100) ELSE NULL END'), 'discountedPrice']
        ],
        order: [
          [Sequelize.literal('CASE WHEN Promotions.percentage IS NOT NULL THEN price - (price * Promotions.percentage / 100) ELSE price END'), 'DESC']
        ],
      });
    
      const productsWithImages = productsWithDiscount.map(product => {
        // Tìm ảnh đầu tiên trong số các phiên bản
        const firstAvailableImage = product.Versions.find(v => v.image)?.image || null;
    
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          origin: product.origin,
          brand: product.brand,
          type: product.type,
          gender: product.gender,
          price: product.price,
          image: firstAvailableImage, // Thêm ảnh từ phiên bản có ảnh đầu tiên
          hasPromotion: !!product.Promotions.length,
          discountedPrice: product.dataValues.discountedPrice, // Giá đã giảm nếu có, nếu không thì null
          Versions: product.Versions // Vẫn giữ thông tin phiên bản
        };
      });
    
      return productsWithImages;
    } catch (error) {
      console.error(error);
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
