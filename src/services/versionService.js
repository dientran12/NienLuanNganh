const db = require('../models/index');
const Version = db.Versions;
const Product = db.Product;
const Color = db.Color;
const Size = db.Size;
const SizeItem = db.SizeItem;
// const path = require('path');


const VersionService = {
    createProductDetail: async (productId, colorName, image) => {
      try {
        // Kiểm tra xem màu sắc đã tồn tại chưa
        let color = await Color.findOne({
          where: {
            colorName: colorName,
          },
        });
    
        // Nếu màu sắc chưa tồn tại, tạo màu sắc mới
        if (!color) {
          color = await Color.create({
            colorName: colorName,
          });
        }
    
        // Kiểm tra xem version với productId và colorId đã tồn tại chưa
        const existingVersion = await Version.findOne({
          where: {
            productId: productId,
            colorId: color.id,
          },
        });
    
        // Nếu version đã tồn tại, thông báo lỗi
        if (existingVersion) {
          return {error: "Version đã tồn tại"}
        } else {
          // Tạo version với productId, colorId và image
        const newVersion = await Version.create({
          productId: productId,
          colorId: color.id,
          image: image,
        });
    
          return newVersion;
        }   
        
      } catch (error) {
        throw new Error('Error creating version: ' + error.message);
      }
    },
    
    getProductDetailById: async (productDetailId) => {
      try {
        const productDetail = await Version.findByPk(productDetailId, {
          include: [
            {
              model: SizeItem,
              include: [Size], // Đảm bảo rằng model Size đã được import
            },
            {
              model: Color // Đảm bảo rằng model Color đã được import
            }
          ]
        });
    
        if (!productDetail) {
          return { success: false, message: 'Version not found.' };
        }
    
        const sizesWithQuantities = productDetail.SizeItems.map(item => {
          return { id: item.Size.id, sizeName: item.Size.sizeName, quantity: item.quantity };
        });
    
        const version = { 
          ...productDetail.get({ plain: true }), 
          colorName: productDetail.Color.colorName, // Giả định rằng trường màu sắc được lưu trong thuộc tính colorName
          sizes: sizesWithQuantities,
          totalQuantity: sizesWithQuantities.reduce((sum, item) => sum + item.quantity, 0) // Tính tổng số lượng
        };
    
        return { success: true, version };
      } catch (error) {
        console.error('Error getting product detail:', error);
        return { success: false, message: 'Error getting product detail: ' + error.message };
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

    updateProductDetail: async (versionId, colorName, imageName) => {
        try {
          // Kiểm tra xem màu sắc có tồn tại trong bảng Colors không
          let color = await Color.findOne({ where: { colorName } });
          if (!color) {
            // Nếu màu sắc không tồn tại, tạo một màu mới
            color = await Color.create({ colorName });
          }
      
          // Cập nhật thông tin phiên bản
          const updatedVersion = await Version.update(
            { colorId: color.id, image: imageName }, // Dữ liệu cần cập nhật
            { where: { id: versionId } } // Điều kiện cập nhật
          );
      
          if (updatedVersion[0] === 1) {
            // Nếu có một phiên bản được cập nhật thành công
            return {status: "success", message: "Cập nhật version thành công."};
          } else {
            // Nếu không có phiên bản nào được cập nhật, throw lỗi
            return {status: "false", message: "Version không tồn tại hoặc cập nhật lỗi."}
          }
        } catch (error) {
          throw new Error('Error updating version: ' + error.message);
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
            },
            include: [
              {
                model: Color, // Liên kết với bảng Colors
                attributes: ['colorName'], // Chỉ lấy trường colorName
                required: true // Nếu phiên bản không có màu sắc thì không hiển thị phiên bản đó
              }
            ]
          });
      
          return versions;
        } catch (error) {
          throw error;
        }
    },

    getAllProductDetails: async () => {
      try {
        const versions = await Version.findAll();    
        return {status: "success", data: versions};
      } catch (error) {
        throw error;
      }
  }
};

module.exports = VersionService;
