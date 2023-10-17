// Trong orderController.js
import createOrder from '../services/orderService';

// Hàm để tạo đơn hàng
export const addOrder = async (req, res) => {
    try {
        const orderData = req.body; // Dữ liệu đơn hàng từ request body
        const response = await createOrder(orderData);
        return res.status(201).json(response); // Trả về mã trạng thái 201 (Created)
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
}

// Các hàm khác để quản lý đơn hàng
