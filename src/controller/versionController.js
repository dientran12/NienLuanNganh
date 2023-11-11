const productDetailService = require('../services/versionService');


const productDetailController = {
    createProductDetail: async (req, res) => {
        try {            
            const { colorName, image, productId } = req.body;         
            if (!colorName)
              throw new Error('colorName không được cung cấp')
            if (!productId)
              throw new Error('productId không được cung cấp')
            if (!image)
              throw new Error('image không được cung cấp')
                                   
            const productDetail = await productDetailService.createProductDetail(productId, colorName, image);
            res.status(201).json(productDetail);
        } catch (error) {
            res.status(422).json({ error: error.message });
        }
    },

    getAllProductDetails: async (req, res) => {
        try {
            const productDetails = await productDetailService.getAllProductDetails();
            res.status(200).json(productDetails);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProductDetailById: async (req, res) => {
        const productDetailId = req.params.id;
        try {
            const productDetail = await productDetailService.getProductDetailById(productDetailId);
            res.status(200).json(productDetail);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateProductDetail: async (req, res) => {
        try {
          const { colorName, image } = req.body;
          const versionId = req.params.id;
      
          const updatedVersion = await productDetailService.updateProductDetail(versionId, colorName, image);
      
          // Trả về phiên bản đã được cập nhật
          res.status(201).json(updatedVersion);
        } catch (error) {
          // Xử lý lỗi nếu có
          res.status(500).json({ error: error.message });
        }
      },

    deleteProductDetailById: async (req, res) => {
        const productDetailId = req.params.id;
        try {
            const result = await productDetailService.deleteProductDetailById(productDetailId);
            res.status(200).json({ message: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllVersionsByProductId: async (req, res) => {
        const { productId } = req.params; // Lấy productId từ request parameters
        
        try {
          const versions = await productDetailService.getAllVersionsByProductId(productId); // Gọi service để lấy tất cả phiên bản
          
          // Trả về kết quả cho client
          return res.status(200).json({
            success: true,
            versions: versions
          });
        } catch (error) {
          // Xử lý lỗi nếu có
          return res.status(500).json({
            success: false,
            error: error.message
          });
        }
      }
};

module.exports = productDetailController;
