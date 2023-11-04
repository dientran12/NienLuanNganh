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

  addProductToCategory: async (req, res) => {
    try {
      const { categoryId, productId } = req.body;
      const result = await categoriesService.addProductToCategory(categoryId, productId);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
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
  }
};

module.exports = categoriesController;
