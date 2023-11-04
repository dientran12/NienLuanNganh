const categoriesService = require('../services/categoriesService');

const categoriesController = {
  createCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      const result = await categoriesService.createCategory(categoryName);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const result = await categoriesService.deleteCategory(categoryId);
      console.log(result);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getProductsByCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await categoriesService.getProductsByCategory(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getCategoryByProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await categoriesService.getCategoryByProductId(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  addProductToCategory: async (req, res) => {   
    const { productId, categoryId } = req.body;

    const result = await categoriesService.addProductToMultipleCategories(productId, categoryId);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const result = await categoriesService.getAllCategories();

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  removeProductFromCategory: async (req, res) => {
    try {
      const { productId, categoryId } = req.params;
      const result = await categoriesService.removeProductFromCategory(productId, categoryId);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  updateCategory: async (req, res) => {
    const categoryId = req.params.id; // Lấy ID danh mục từ request parameters
    const { categoryName } = req.body; // Lấy thông tin danh mục cần cập nhật từ request body

    try {
      const updatedCategory = await categoriesService.update(categoryId, categoryName);
      res.status(200).json(updatedCategory); // Trả về danh mục đã được cập nhật
    } catch (error) {
      res.status(500).json({ error: error.message }); // Trả về lỗi nếu có lỗi xảy ra trong quá trình xử lý
    }
  },

  getCategoryById: async (req, res) => {
    const categoryId = req.params.id; // Lấy ID danh mục từ request parameters 

    try {
      const Category = await categoriesService.getCategoryById(categoryId);
      res.status(200).json(Category); 
    } catch (error) {
      res.status(500).json({ error: error.message }); // Trả về lỗi nếu có lỗi xảy ra trong quá trình xử lý
    }
  }
};

module.exports = categoriesController;
