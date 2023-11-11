const db = require('../models/index');
const { Op } = require('sequelize');
const SizeItem = db.SizeItem;
const Size = db.Size;
const Versions = db.Versions;

const sizeItemService = {
  addSizeItem: async (sizeName, versionId, quantity) => {
    try {
      // Kiểm tra xem size có tồn tại chưa
      let size = await Size.findOne({ where: { sizeName: sizeName } });
  
      // Nếu size chưa tồn tại, tạo mới
      if (!size) {
        size = await Size.create({ sizeName: sizeName });
      }
  
      // Kiểm tra xem phiên bản đã có kích thước này chưa
      const existingSizeItem = await SizeItem.findOne({
        where: { versionId: versionId, sizeId: size.id }
      });
  
      if (existingSizeItem) {
        // Nếu phiên bản đã có kích thước này, thông báo lỗi
        throw new Error(`Version ${versionId} already has size ${sizeName}.`);
      }
  
      // Tạo một SizeItem mới dựa trên thông tin được cung cấp
      const newSizeItem = await SizeItem.create({
        sizeId: size.id,
        versionId: versionId,
        quantity: quantity
      });
  
      return newSizeItem;
    } catch (error) {
      throw new Error('Error adding SizeItem: ' + error.message);
    }
  },
  

    updateSizeItem: async (sizeItemId, quantity, sizeName, versionId) => {
      try {
        // Tìm Size hoặc tạo mới nếu chưa tồn tại
        let size = await Size.findOne({ where: { sizeName: sizeName } });
        if (!size) {
          size = await Size.create({ sizeName: sizeName });
        }
    
        // Tìm và xóa SizeItem cũ nếu có cùng versionId và sizeId mới
        await SizeItem.destroy({
          where: {
            versionId: versionId,
            sizeId: size.id,
            id: { [Op.ne]: sizeItemId } // Loại trừ SizeItem hiện tại
          }
        });
    
        // Cập nhật hoặc tạo mới SizeItem với sizeId và versionId mới
        const [sizeItem, created] = await SizeItem.upsert({
          id: sizeItemId,
          quantity: quantity,
          versionId: versionId,
          sizeId: size.id
        }, { returning: true });
    
        // Kiểm tra để xác định hành động đã thực hiện là cập nhật hay tạo mới
        const message = created 
          ? 'SizeItem created successfully.' 
          : 'SizeItem updated successfully.';
    
        return { success: true, message: message, sizeItem: sizeItem };
      } catch (error) {
        console.error('Error updating or creating SizeItem:', error);
        return { success: false, message: 'Internal server error.', error: error };
      }
    },

    updateSizeItemQuantity: async (Id, newQuantity) => {
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