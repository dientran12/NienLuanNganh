const db = require('../models/index');
const Product = db.Product;
const Size = db.Size;

const sizeService = {
        createSize: async (sizeData) => {
          try {              
              // Kiểm tra xem tên size đã tồn tại hay chưa
              const existingSize = await Size.findOne({
                  where: {
                      sizeName: sizeData.sizeName
                  }
              });

              if (existingSize) {
                throw new Error('Size đã tồn tại.');
              }

              // Nếu tên size chưa tồn tại, tạo mới và trả về thông tin size vừa tạo
              const newSize = await Size.create(sizeData);
              return newSize;
          } catch (error) {
              throw new Error('Error creating size: ' + error.message);
          }
      },
      getAllSizes: async () => {
        try {
          const sizes = await Size.findAll();
          return sizes;
        } catch (error) {
          console.error(error);
          return null;
        }
      },      
      deleteSizeById: async (sizeId) => {
        try {
          const deletedSize = await Size.destroy({
            where: { idSize: sizeId }
          });
          if (deletedSize > 0) {
            return { message: 'Size deleted successfully.' };
          } else {
            return { message: 'Size not found.' };
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
      getProductsBySize: async (sizeId) => {
        try {
          const size = await Size.findByPk(sizeId, {
            include: [{ model: Product, through: 'ProductDetails' }]
          });
          return size ? size.Products : [];
        } catch (error) {
          console.error(error);
          return null;
        }
      },
      getSizeById: async (sizeId) => {
        try {
          const size = await Size.findByPk(sizeId);
          if (size) {
            return size;
          } else {
            throw new Error('Size not found.');
          }
        } catch (error) {
          throw new Error('Error getting size: ' + error.message);
        }
      },
      updateSize: async (sizeId, updatedSizeData) => {
        try {
          const size = await Size.findByPk(sizeId);
          if (size) {
            await size.update(updatedSizeData);
            return size;
          } else {
            throw new Error('Size not found.');
          }
        } catch (error) {
          throw new Error('Error updating size: ' + error.message);
        }
      }
};

module.exports = sizeService;
