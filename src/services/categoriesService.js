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
      }

      await category.destroy();
      return { success: true, message: 'Danh mục đã được xóa' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal Server Error' };
    }
  },

  getProductsByCategory: async (categoryId) => {
    try {
      const category = await Categories.findByPk(categoryId);

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

  addProductToCategory: async (categoryId, productId) => {
    try {
        const category = await Categories.findByPk(categoryId);
        const product = await Product.findByPk(productId);

        if (!category || !product) {
            return { success: false, message: 'Danh mục hoặc sản phẩm không tồn tại' };
        }

        const existingLink = await CategoryProducts.findOne({
            where: {
                categoryId: categoryId,
                productId: productId
            }
        });

        if (existingLink) {
            return { success: false, message: 'Sản phẩm đã tồn tại trong danh mục' };
        }

        await CategoryProducts.create({
            categoryId: categoryId,
            productId: productId
        });

        return { success: true, message: 'Sản phẩm đã được thêm vào danh mục' };
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
            return { success: false, message: 'Sản phẩm không tồn tại trong danh mục' };
        }

        await category.removeProduct(product);

        return { success: true, message: 'Sản phẩm đã được xóa khỏi danh mục' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
  }
};

module.exports = categoriesService;
