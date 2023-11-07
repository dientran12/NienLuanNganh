const db = require('../models/index');
const SizeItem = db.SizeItem;
const Size = db.Size;
const Versions = db.Versions;

const sizeItemService = {
    addSizeItem: async (sizeId, versionId, quantity) => {
      try {
        // Tạo một SizeItem mới dựa trên thông tin được cung cấp
        const newSizeItem = await SizeItem.create({
          sizeId: sizeId,
          versionId: versionId,
          quantity: quantity
        });
    
        return newSizeItem;
      } catch (error) {
        throw new Error('Error adding SizeItem: ' + error.message);
      }
    },
  
    updateSizeItem: async (Id, newQuantity) => {
      try {
        // Kiểm tra xem SizeItem có tồn tại không
        const existingSizeItem = await SizeItem.findByPk(Id);
    
        if (!existingSizeItem) {
          throw new Error('SizeItem not found.');
        }
    
        // Cập nhật quantity
        const updatedSizeItem = await existingSizeItem.update({
          quantity: newQuantity,
        });
    
        return updatedSizeItem;
      } catch (error) {
        throw new Error('Error updating SizeItem quantity: ' + error.message);
      }
    },

    removeSizeItemByVersionAndSizeId: async (sizeItemId) => {
      try {
        // Kiểm tra xem SizeItem có tồn tại không
        const existingSizeItem = await SizeItem.findByPk(sizeItemId);
    
        if (!existingSizeItem) {
          throw new Error('SizeItem not found.');
        }
    
        // Xóa SizeItem dựa trên id
        await existingSizeItem.destroy();
    
        return { message: 'SizeItem deleted successfully.' };
      } catch (error) {
        throw new Error('Error deleting SizeItem: ' + error.message);
      }
    },

    getQuantityById: async (sizeItemId) => {
      try {
        const sizeItem = await SizeItem.findByPk(sizeItemId, {
          attributes: ['quantity'] // Chỉ lấy thuộc tính 'quantity'
        });
    
        if (!sizeItem) {
          throw new Error('SizeItem not found');
        }
    
        return sizeItem.quantity;
      } catch (error) {
        throw error;
      }
    },

    getTotalQuantityByVersionId: async (versionId) => {
      try {
        const totalQuantity = await SizeItem.sum('quantity', {
          where: {
            versionId: versionId
          }
        });
    
        return totalQuantity;
      } catch (error) {
        throw error;
      }
    },

    getSizeItemDetails: async (id) => {
      try {
        const sizeItem = await SizeItem.findByPk(id, {
          include: [
            {
              model: Versions,
              required: true
            },
            {
              model: Size,
              required: true
            }
          ]
        });
    
        if (!sizeItem) {
          return { success: false, message: 'SizeItem not found.' };
        }
    
        return { success: true, sizeItem };
      } catch (error) {
        console.error('Error getting SizeItem details:', error);
        return { success: false, message: 'Internal server error.' };
      }
    }

};    
module.exports = sizeItemService;