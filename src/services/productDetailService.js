const db = require('../models/index');
const ProductDetail = db.ProductDetail;
const Product = db.Product;
const Color = db.Color;
const Size = db.Size;

const productDetailService = {
    createProductDetail: async (productDetailData) => {
        try {
            const productDetail = await ProductDetail.create(productDetailData);
            return productDetail;
        } catch (error) {           
            throw new Error('Sản phẩm, size hoặc color không tồn tại: ' + error.message);
        }
    },
    getAllProductDetails: async () => {
        try {
            const productDetails = await ProductDetail.findAll({
                include: [Product, Color, Size],
            });
            return productDetails;
        } catch (error) {
            throw new Error('Error getting product details: ' + error.message);
        }
    },
    
    getProductDetailById: async (productDetailId) => {
        try {
            const productDetail = await ProductDetail.findByPk(productDetailId, {
                include: [Product, Color, Size],
            });
            if (productDetail) {
                return productDetail;
            } else {
                throw new Error('Product detail not found.');
            }
        } catch (error) {
            throw new Error('Error getting product detail: ' + error.message);
        }
    },

    getProductDetailByProducId: async (productId) => {
        try {
            const detail = await ProductDetail.findAll({
                where: {
                    productId: productId
                }
            });
            if (detail) {
                return detail;
            } else {
                throw new Error('Product not found in detail.');
            }
        } catch (error) {
            throw new Error('Error getting product detail: ' + error.message);
        }
    },

    updateProductDetail: async (productDetailId, updatedProductDetailData) => {
      try {
          const productDetail = await ProductDetail.findByPk(productDetailId);
          if (productDetail) {
              await productDetail.update(updatedProductDetailData);
              return productDetail;
          } else {
              throw new Error('Product detail not found.');
          }
      } catch (error) {
          throw new Error('Error updating product detail: ' + error.message);
      }
    },

    deleteProductDetailById: async (productDetailId) => {
        try {
            const deletedProductDetail = await ProductDetail.destroy({
                where: { id: productDetailId },
            });
            if (deletedProductDetail) {
                return 'Product detail deleted successfully.';
            } else {
                throw new Error('Product detail not found.');
            }
        } catch (error) {
            throw new Error('Error deleting product detail: ' + error.message);
        }
    }  
};

module.exports = productDetailService;
