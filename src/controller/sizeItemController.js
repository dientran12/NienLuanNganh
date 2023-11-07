const SizeItemService = require('../services/sizeItemService');

const sizeItemController = {
  addSizeItem: async (req, res) => {
    try {
      const { sizeId, versionId, quantity } = req.body; // Lấy thông tin sizeId, versionId, quantity từ body request
  
      // Gọi service để thêm SizeItem
      const newSizeItem = await SizeItemService.addSizeItem(sizeId, versionId, quantity);
  
      // Trả về SizeItem vừa được tạo
      res.status(200).json(newSizeItem);
    } catch (error) {
      // Xử lý lỗi nếu có
      res.status(500).json({ error: error.message });
    }
  },

    updateSizeItem: async (req, res) => {
      try {
        const id = req.params.id; // Lấy `versionId` từ đường dẫn hoặc body request
        const quantity = req.body.quantity; // Dữ liệu mới mà bạn muốn cập nhật
        console.log(quantity);
        const updatedSizeItems = await SizeItemService.updateSizeItem(id, quantity);
    
        // Trả về danh sách `SizeItem` đã được cập nhật
        res.status(200).json(updatedSizeItems);
      } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ error: error.message });
      }
    },

    removeSizeItemByVersionAndSizeId: async (req, res) => {
      try {
        const id = req.params.id; // Lấy `sizeItemId` từ đường dẫn hoặc body request
    
        // Gọi service để xóa SizeItem dựa trên id
        await SizeItemService.removeSizeItemByVersionAndSizeId(id) 
    
        // Trả về thông báo xác nhận
        res.status(200).json({ message: 'SizeItem deleted successfully.' });
      } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ error: error.message });
      }
    },

    getQuantity: async (req, res) => {
      const { id } = req.params; // Lấy sizeItemId từ request parameters
      
      try {
        const quantity = await SizeItemService.getQuantityById(id); // Gọi service để lấy quantity
        
        // Trả về kết quả cho client
        return res.status(200).json({
          success: true,
          quantity: quantity
        });
      } catch (error) {
        // Xử lý lỗi nếu có
        return res.status(500).json({
          success: false,
          error: error.message
        });
      }
    },

    getTotalQuantityByVersionId: async (req, res) => {
      const { versionId } = req.params; // Lấy versionId từ request parameters
      
      try {
        const totalQuantity = await SizeItemService.getTotalQuantityByVersionId(versionId); // Gọi service để lấy tổng quantity
        
        // Trả về kết quả cho client
        return res.status(200).json({
          success: true,
          total: totalQuantity
        });
      } catch (error) {
        // Xử lý lỗi nếu có
        return res.status(500).json({
          success: false,
          error: error.message
        });
      }
    },

    getSizeItemDetails: async (req, res) => {
      try {
        const { id } = req.params; // Lấy ID từ request parameters
        const result = await SizeItemService.getSizeItemDetails(id);
    
        if (result.success) {
          res.status(200).json(result);
        } else {
          res.status(404).json(result); // Sử dụng mã 404 nếu không tìm thấy SizeItem
        }
      } catch (error) {
        console.error('Error in getSizeItemDetailsController:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' }); // Trả về lỗi server nếu có sự cố
      }
    }
}

module.exports = sizeItemController;