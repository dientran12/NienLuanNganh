const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../models');
const Product = db.Product;
const Promotion = db.Promotion;
const Size = db.Size;
const Color = db.Color;
const ProductDetail = db.ProductDetail;
const ProductPromotions = db.ProductPromotion;

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
          [Sequelize.literal('price - (price * Promotions.discountPercentage / 100)'), 'discountedPrice']
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
          type: type
        },
        include: [
          {
            model: ProductDetail,
            include: [
              {
                model: Color,
                attributes: ['idColor', 'colorName']
              },
              {
                model: Size,
                attributes: ['idSize', 'sizeName']
              }
            ]
          },
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
          [Sequelize.literal('CASE WHEN Promotions.percentage IS NOT NULL THEN price - (price * Promotions.discountPercentage / 100) ELSE NULL END'), 'discountedPrice']
        ]
      });

      const productsWithDiscount = products.map(product => {
        let discountedPrice = product.price;
        if (product.Promotions.length > 0) {
          const discountPercentage = product.Promotions[0].discountPercentage;
          discountedPrice = product.price - (product.price * discountPercentage / 100);
        }

        return {
          ...product.toJSON(),
          discountedPrice
        };
      });

      return productsWithDiscount;
    } catch (error) {
      throw error;
    }
  },
 
  getByName: async (name) => {
    try {
      const products = await Product.findAll({
        where: {
          name: name
        },
        include: [
          {
            model: ProductDetail,
            include: [
              {
                model: Color,
                attributes: ['idColor', 'colorName']
              },
              {
                model: Size,
                attributes: ['idSize', 'sizeName']
              }
            ]
          },
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
          [Sequelize.literal('CASE WHEN Promotions.percentage IS NOT NULL THEN price - (price * Promotions.discountPercentage / 100) ELSE NULL END'), 'discountedPrice']
        ]
      });

      const productsWithDiscount = products.map(product => {
        let discountedPrice = product.price;
        if (product.Promotions.length > 0) {
          const discountPercentage = product.Promotions[0].discountPercentage;
          discountedPrice = product.price - (product.price * discountPercentage / 100);
        }

        return {
          ...product.toJSON(),
          discountedPrice
        };
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
          [Sequelize.literal('CASE WHEN Promotions.percentage IS NOT NULL THEN price - (price * Promotions.percentage / 100) ELSE NULL END'), 'discountedPrice']
        ],
        include: [
          {
            model: Promotion,
            through: 'PromotionProduct',
            attributes: [] // Chỉ cần kết hợp để lấy ra các sản phẩm không có khuyến mãi, không cần lấy các trường từ bảng Promotion
          }
        ]
      });
      
      return productsWithDiscount;
    } catch (error) {
      throw error;
    }
  },

  getDetailById: async (id) => {
    try {
      const product = await Product.findOne({
        where: { idProduct: id },
        attributes: ['idProduct', 'name', 'description', 'price', 'origin', 'brand', 'type', 'gender', 'createdAt', 'updatedAt'],
        include: [
          {
            model: ProductDetail,
            include: [
              {
                model: Color,
                attributes: ['idColor', 'colorName']
              },
              {
                model: Size,
                attributes: ['idSize', 'sizeName']
              }
            ]
          },
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

      if (!product) {
        return null;
      }

      let discountedPrice = product.price;
      if (product.Promotions.length > 0) {
        const discountPercentage = product.Promotions[0].discountPercentage;
        discountedPrice = product.price - (product.price * discountPercentage / 100);
      }

      const productWithDiscount = {
        ...product.toJSON(),
        discountedPrice
      };

      return productWithDiscount;
    } catch (error) {
      throw error;
    }
  },


  createSize: async (name) => {
    try {
      const newSize = await Size.create({ sizeName: name });
      return newSize;
    } catch (error) {
      throw error;
    }
  },

  createColor: async (name) => {
    try {
      const newColor = await Color.create({ colorName: name });
      return newColor;
    } catch (error) {
      throw error;
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
  deleteProductById: async (productId) => {
    try {
      const product = await Product.findByPk(productId);

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
  async updateProductAndRelatedInfo(productId, productData, colors, sizes, quantities) {
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // Cập nhật thông tin sản phẩm
      await product.update(productData);

      // Cập nhật thông tin màu sắc, size và số lượng trong kho
      await this.updateColorsAndSizes(product, colors, sizes, quantities);

      
      return product;
    } catch (error) {
      throw error;
    }
  },

  async updateColorsAndSizes(product, colors, sizes, quantities) {
    // Xử lý logic để cập nhật thông tin màu sắc, size và số lượng trong kho    
    // Ví dụ: Tạo hoặc cập nhật thông tin trong bảng ProductDetail
    for (let i = 0; i < colors.length; i++) {
      const colorId = colors[i].id;
      const sizeId = sizes[i].id;
      const quantity = quantities[i];

      let productDetail = await ProductDetail.findOne({
        where: {
          productId: product.id,
          colorId: colorId,
          sizeId: sizeId,
        },
      });

      if (productDetail) {
        // Nếu productDetail đã tồn tại, cập nhật số lượng
        productDetail.quantity = quantity;
        await productDetail.save();
      } else {
        // Nếu productDetail chưa tồn tại, tạo mới và thêm số lượng
        await ProductDetail.create({
          productId: product.id,
          colorId: colorId,
          sizeId: sizeId,
          quantity: quantity,
        });
      }
    }
  },
  addSizeAndColorToProduct: async (productId, sizeName, colorName, quantity) => {
    try {
      // Tìm hoặc tạo mới size và color
      const [size, createdSize] = await Size.findOrCreate({
        where: { sizeName: sizeName },
        defaults: { sizeName: sizeName }
      });

      const [color, createdColor] = await Color.findOrCreate({
        where: { colorName: colorName },
        defaults: { colorName: colorName }
      });

      // Liên kết sản phẩm với size và color thông qua bảng ProductDetail
      const productDetail = await ProductDetail.create({
        productId: productId,
        sizeId: size.idSize,
        colorId: color.idColor,
        quantity: quantity
      });

      return { success: true, productDetail };
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
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

        await ProductPromotions.create({
            productId: productId,
            promotionId: promotionId
        });

        // Áp dụng logic khuyến mãi (ví dụ: giảm giá sản phẩm)

        return { success: true, message: 'Sản phẩm đã được áp dụng khuyến mãi' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
  }
  
//   addQuantityToProduct: async (productName, sizeName, colorName, quantity) => {
//     try {
//       const product = await Product.findOne({
//         where: {
//           name: productName
//         }
//       });

//       const size = await Size.findOne({
//         where: {
//           sizeName: sizeName
//         }
//       });

//       const color = await Color.findOne({
//         where: {
//           colorName: colorName
//         }
//       });

//       if (product && size && color) {
//         const existingProductDetail = await ProductDetail.findOne({
//           where: {
//             productId: product.idProduct,
//             sizeId: size.idSize,
//             colorId: color.idColor
//           }
//         });

//         if (existingProductDetail) {
//           existingProductDetail.quantity += quantity;
//           await existingProductDetail.save();
//         } else {
//           await ProductDetail.create({
//             productId: product.idProduct,
//             sizeId: size.idSize,
//             colorId: color.idColor,
//             quantity: quantity
//           });
//         }

//         return { success: true, message: 'Số lượng đã được cập nhật hoặc thêm mới vào chi tiết sản phẩm.' };
//       } else {
//         return { success: false, message: 'Không tìm thấy sản phẩm, size hoặc màu.' };
//       }
//     } catch (error) {
//       console.error(error);
//       return { success: false, message: 'Internal Server Error' };
//     }
//   },

//   async updateProductImages(product, images) {
//     // Xử lý logic để cập nhật thông tin hình ảnh của sản phẩm
//     // Ví dụ: Xóa các hình ảnh cũ của sản phẩm
//     await ProductImage.destroy({
//       where: {
//         productId: product.id,
//       },
//     });

//     // Thêm hình ảnh mới
//     for (const imageUrl of images) {
//       await ProductImage.create({
//         productId: product.id,
//         imageUrl: imageUrl,
//       });
//     }
//   },
};
  

module.exports = productService;
