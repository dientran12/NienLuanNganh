const colorService = require('../services/colorService');

const colorController = {
  createColor: async (req, res) => {
    try {
      const colorData = req.body; // Đảm bảo rằng dữ liệu được gửi từ client đúng theo định dạng
      const color = await colorService.createColor(colorData);
      res.status(201).json(color);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllColors: async (req, res) => {
    try {
      const colors = await colorService.getAllColors();
      res.status(200).json(colors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteColorById: async (req, res) => {
    const colorId = req.params.id;
    try {
      const deletedColor = await colorService.deleteColorById(colorId);
      res.status(200).json(deletedColor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductsByColor: async (req, res) => {
    const colorId = req.params.id;
    try {
      const products = await colorService.getProductsByColor(colorId);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getColorById: async (req, res) => {
    const colorId = req.params.id;
    try {
      const color = await colorService.getColorById(colorId);
      res.status(200).json(color);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  getColorByName: async (req, res) => {
    const colorName = req.params.name;
    try {
      const color = await colorService.getColorByName(colorName);
      res.status(200).json(color);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  updateColor: async (req, res) => {
    const colorId = req.params.id;
    const updatedColorData = req.body; // Đảm bảo rằng dữ liệu được gửi từ client đúng theo định dạng
    try {
      const updatedColor = await colorService.updateColor(colorId, updatedColorData);
      res.status(200).json(updatedColor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = colorController;
