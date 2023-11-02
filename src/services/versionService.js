const db = require('../models/index');
const Version = db.Versions;
const Product = db.Product;
const Color = db.Color;
const SizeItem = db.SizeItem;
const Size = db.Size;

const VersionService = {
    createProductDetail: async (productDetailData) => {
        try {
            console.log('Data:', productDetailData);
            const productDetail = await Version.create(productDetailData);
            return productDetail;
        } catch (error) {           
            throw new Error('Sản phẩm hoặc color không tồn tại: ' + error.message);
        }
    },
    getAllProductDetails: async () => {
        try {
            const productDetails = await Version.findAll({
                include: [Product, Color],
            });
            return productDetails;
        } catch (error) {
            throw new Error('Error getting product details: ' + error.message);
        }
    },
    
    getProductDetailById: async (productDetailId) => {
        try {
            const productDetail = await Version.findByPk(productDetailId, {
                include: [
                    SizeItem
                ]
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
            const detail = await Version.findAll({
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
          const productDetail = await Version.findByPk(productDetailId);
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
            const deletedProductDetail = await Version.destroy({
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
    },
    
    getAllVersionsByProductId: async (productId) => {
        try {
          const versions = await Version.findAll({
            where: {
              productId: productId
            }
          });
      
          return versions;
        } catch (error) {
          throw error;
        }
    }
};

module.exports = VersionService;
