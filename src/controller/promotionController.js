const db = require('../models');
const Promotion = db.Promotion;

const promotionController = {
    createPromotion: async (req, res) => {
        try {
            const { name, percentage, startDate, endDate } = req.body;
            const newDiscount = await Promotion.create({ 
                name: name,
                percentage: percentage,
                startDate: startDate,
                endDate: endDate
             });
            res.status(201).json({ success: true, discount: newDiscount });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    deletePromotion: async (req, res) => {
        try {
            const id = req.params.id;
            const discount = await Promotion.findByPk(id);
    
            if (!discount) {
                return res.status(404).json({ success: false, message: 'Mã giảm giá không tồn tại' });
            }
    
            await discount.destroy();
            res.status(204).json({ success: true, message: 'Mã giảm giá đã được xóa thành công' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Lỗi nội bộ của máy chủ' });
        }
    },
};

module.exports = promotionController;