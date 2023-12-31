const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../models/index');
const Categories = db.Categories;
const CategoryProducts = db.CategoryProducts;
const Product = db.Product;
const Version = db.Versions;
const Promotion = db.Promotions;
const ProductPromotions = db.ProductPromotions;

const categoriesService = {
  createCategory: async (categoryName, description) => {
    try {
      // Kiểm tra dữ liệu đầu vào
      if (!categoryName) {
        return { success: false, message: 'Tên danh mục không được để trống.' };
      }
  
      // Chuẩn hóa tên danh mục
      categoryName = categoryName.trim().toLowerCase();
  
      // Kiểm tra xem tên danh mục đã chuẩn hóa có tồn tại chưa
      const existingCategory = await Categories.findOne({
        where: { categoryName: categoryName }
      });
  
      if (existingCategory) {
        return { success: false, message: 'Danh mục đã tồn tại. Vui lòng chọn tên khác.' };
      }
  
      // Nếu categoryName hợp lệ và chưa tồn tại, tiến hành tạo danh mục mới
      const newCategory = await Categories.create({ categoryName, description });
      return { success: true, category: newCategory };
  
    } catch (error) {
      console.error(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return { success: false, message: 'Danh mục đã tồn tại. Vui lòng chọn tên khác.' };
      } else {
        return { success: false, message: 'Internal Server Error' };
      }
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const category = await Categories.findByPk(categoryId);

      if (!category) {
        return { success: false, message: 'Danh mục không tồn tại' };
      } else {
        await category.destroy();
        return { success: true, message: 'Danh mục đã được xóa' };
      }     
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal Server Error' };
    }
  },

  getProductsByCategory: async (id) => {
    try {
      const category = await Categories.findByPk(id);
  
      if (!category) {
        return { success: false, message: 'Danh mục không tồn tại' };
      }
  
      const currentDate = new Date();
      const products = await category.getProducts({
        include: [
          {
            model: Version,
            attributes: ['id', 'productId', 'colorId', 'image'],
            order: [['createdAt', 'ASC']],
            separate: true,
            required: false
          },
          {
            model: Promotion,
            attributes: ['name', 'percentage'],
            through: {
              model: ProductPromotions,
              attributes: []
            },
            required: false,
            where: {
              startDate: { [Op.lte]: currentDate },
              endDate: { [Op.gte]: currentDate }
            }
          }
        ]
      });
  
      // Transform the products array to calculate discounted price and add image
      const productsWithDetails = products.map(product => {
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
          Versions: product.Versions || []
        };
      });
  
      return { success: true, products: productsWithDetails };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal Server Error' };
    }
  },    

  getCategoryByProductId: async (productId) => {
    try {
      const currentDate = new Date();
      const product = await Product.findByPk(productId, {
        include: [
          {
            model: Categories,
            attributes: ['id', 'categoryName', 'createdAt', 'updatedAt'],
            through: {
              attributes: []
            }
          },
          {
            model: Version,
            attributes: ['id', 'productId', 'colorId', 'image'],
            order: [['createdAt', 'ASC']],
            limit: 1,
            separate: true
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
              startDate: { [Op.lte]: currentDate },
              endDate: { [Op.gte]: currentDate }
            }
          }
        ]
      });
  
      if (!product) {
        return { success: false, message: 'Sản phẩm không tồn tại.' };
      }
  
      const hasPromotion = product.Promotions && product.Promotions.length > 0;
      const discountPercentage = hasPromotion ? product.Promotions[0].percentage : null;
      const discountedPrice = hasPromotion
        ? product.price - (product.price * (discountPercentage / 100))
        : null;
  
      const firstVersionImage = product.Versions.length > 0 ? product.Versions[0].image : null;
      const categories = product.Categories.map(({ id, categoryName, createdAt, updatedAt }) => ({
        id,
        categoryName,
        createdAt,
        updatedAt
      }));
  
      // Remove the Categories association from the product object
      const productData = product.get({ plain: true });
      delete productData.Categories;
  
      return {
        success: true,
        product: {
          ...productData,
          discountPercentage: hasPromotion ? discountPercentage : null,
          discountedPrice,
          image: firstVersionImage
        },
        categories // Only return the categories array
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal Server Error' };
    }
  },      

  addProductToMultipleCategories: async (productId, categoryIds) => {
    try {
      const product = await Product.findByPk(productId);  
      if (!product) {
        return { success: false, message: 'Sản phẩm không tồn tại' };
      }
      
      // Đảm bảo categoryIds là một mảng
      const categoryIdsArray = Array.isArray(categoryIds) ? categoryIds : [categoryIds];

      const existingLinks = await CategoryProducts.findAll({
        where: {
          productId: productId,
          categoryId: categoryIdsArray
        }
      });
  
      const existingCategoryIds = existingLinks.map(link => link.categoryId);
      // Sử dụng categoryIdsArray thay vì categoryId để tránh lỗi
      const newCategoryIds = categoryIdsArray.filter(id => !existingCategoryIds.includes(id));
  
      if (newCategoryIds.length === 0) {
        return { success: false, message: 'Sản phẩm đã tồn tại trong tất cả các danh mục' };
      }
  
      const newLinks = newCategoryIds.map(id => {
        return {
          productId: productId,
          categoryId: id
        };
      });
  
      const createdLinks = await CategoryProducts.bulkCreate(newLinks);
  
      return { success: true, message: 'Sản phẩm đã được thêm vào các danh mục', info: createdLinks };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal Server Error' };
    }
  },

  getAllCategories: async () => {
    try {
      const categories = await Categories.findAll();
      return { success: true, categories };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal Server Error' };
    }
  },

  removeProductFromCategory: async (productId, categoryId) => {
    try {
        const product = await Product.findByPk(productId);
        const category = await Categories.findByPk(categoryId);

        if (!product || !category) {
            return { success: false, message: 'Sản phẩm hoặc danh mục không tồn tại' };
        }

        const categoryProductLink = await CategoryProducts.findOne({
            where: {
                categoryId: categoryId,
                productId: productId
            }
        });

        if (!categoryProductLink) {
            return { success: false, message: 'Sản phẩm không tồn tại trong danh mục', infoCategory: category };
        }

        await category.removeProduct(product);

        return { success: true, message: 'Sản phẩm đã được xóa khỏi danh mục', infoCategory: category, infoProduct: product};
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
  },

  update: async (id, categoryName, description) => {
    try {
      const category = await Categories.findByPk(id);
      if (category) {
        category.categoryName = categoryName;
        category.description = description;
        await category.save();
        return { success: true, message: 'Category updated successfully.', category };
      } else {
        throw new Error('Category not found.');
      }
    } catch (error) {
      throw error;
    }
  },

  getCategoryById: async (id) => {
    try {
      const category = await Categories.findByPk(id);
      if (category) {
        return { success: true, 'category': category };
      } else {
        return { success: false, message: 'Category not found.' };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal Server Error' };
    }
  },

  getCategoryProductByProductId: async (productId) => {
    try {
      const productCategory = await CategoryProducts.findOne({
        where: {
          productId: productId,
        },
      });
      return productCategory;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  
};

module.exports = categoriesService;
