const sizeService = require('../services/sizeService');

const sizeController = {
      createSize: async (req, res) => {
        try {
          const sizeData = req.body;
          const size = await sizeService.createSize(sizeData);
          res.status(201).json(size);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      getAllSizes: async (req, res) => {
        try {
          const sizes = await sizeService.getAllSizes();
          res.status(200).json(sizes);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      getSizeById: async (req, res) => {
        const sizeId = req.params.id;
        try {
          const size = await sizeService.getSizeById(sizeId);
          res.status(200).json(size);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      updateSize: async (req, res) => {
        const sizeId = req.params.id;
        const updatedSizeData = req.body;
        try {
          const updatedSize = await sizeService.updateSize(sizeId, updatedSizeData);
          res.status(200).json(updatedSize);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      deleteSizeById: async (req, res) => {
        const sizeId = req.params.id;
        try {
          const deletedSize = await sizeService.deleteSizeById(sizeId);
          res.status(200).json(deletedSize);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      getProductsBySize: async (req, res) => {
        const sizeId = req.params.id;
        try {
          const products = await sizeService.getProductsBySize(sizeId);
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
};

module.exports = sizeController;
