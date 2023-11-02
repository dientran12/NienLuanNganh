const productDetailService = require('../services/versionService');


const productDetailController = {
    createProductDetail: async (req, res) => {
        try {
            const { colorId, productId} = req.body;
            const imageFileName = req.file ? req.file.filename : null;
            const productDetailData = {
                colorId: colorId,
                productId: productId,
                image: imageFileName // Lưu tên tệp tin ảnh vào cơ sở dữ liệu
            };            
            
            const productDetail = await productDetailService.createProductDetail(productDetailData);
            res.status(201).json(productDetail);
        } catch (error) {
            res.status(500).json({ error: error.message });
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
        const productDetailId = req.params.id;
        const { colorId, productId } = req.body;
        const imageFileName = req.file ? req.file.filename : null;
        
        const updatedProductDetailData = {
            colorId: colorId,
            productId: productId,
            image: imageFileName // Lưu tên tệp tin ảnh vào cơ sở dữ liệu
        };
        try {
            const updatedProductDetail = await productDetailService.updateProductDetail(productDetailId, updatedProductDetailData);
            res.status(200).json(updatedProductDetail);
        } catch (error) {
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
