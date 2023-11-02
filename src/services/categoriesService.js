const { Categories, Product, CategoryProducts } = require('../models');

const categoriesService = {
  createCategory: async (categoryName) => {
    try {
      const existingCategory = await Categories.findOne({
        where: { categoryName: categoryName }
      });

      if (existingCategory) {
        return { success: false, message: 'Danh mục đã tồn tại' };
      }

      const newCategory = await Categories.create({ categoryName });
      return { success: true, category: newCategory };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal Server Error' };
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

      const products = await category.getProducts();
      return { success: true, products };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal Server Error' };
    }
  },

  getCategoryByProductId: async (productId) => {
    try {
      const product = await Product.findByPk(productId, {
        include: Categories // Include the Category model to get associated categories
      });
  
      if (!product) {
        return { success: false, message: 'Sản phẩm không tồn tại.' };
      }
  
      return { success: true, categories: product.Categories };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal Server Error' };
    }
  },

  addProductToMultipleCategories: async (productId, categoryId) => {
    try {
      const product = await Product.findByPk(productId);  
      if (!product) {
        return { success: false, message: 'Sản phẩm không tồn tại' };
      }
  
      const existingLinks = await CategoryProducts.findAll({
        where: {
          productId: productId,
          categoryId: categoryId
        }
      });
  
      const existingCategoryIds = existingLinks.map(link => link.categoryId);
      const newCategoryIds = categoryId.filter(categoryId => !existingCategoryIds.includes(categoryId));
  
      if (newCategoryIds.length === 0) {
        return { success: false, message: 'Sản phẩm đã tồn tại trong tất cả các danh mục' };
      }
  
      const newLinks = newCategoryIds.map(categoryId => {
        return {
          productId: productId,
          categoryId: categoryId
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

  update: async (id, categoryName) => {
    try {
      const category = await Categories.findByPk(id);
      if (category) {
        category.categoryName = categoryName;
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
