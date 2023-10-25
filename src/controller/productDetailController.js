const productDetailService = require('../services/productDetailService');


const productDetailController = {
    createProductDetail: async (req, res) => {
        try {
            const { sizeId, colorId, productId, quantity } = req.body;
            const imageFileName = req.file ? req.file.filename : null;
            const productDetailData = {
                sizeId: sizeId,
                colorId: colorId,
                productId: productId,
                quantity: quantity,
                image: imageFileName // Lưu tên tệp tin ảnh vào cơ sở dữ liệu
            };              
            console.log('Data:', productDetailData);

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
        const { sizeId, colorId, productId, quantity } = req.body;
        const imageFileName = req.file ? req.file.filename : null;
        
        const updatedProductDetailData = {
            sizeId: sizeId,
            colorId: colorId,
            productId: productId,
            quantity: quantity,
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
};

module.exports = productDetailController;
