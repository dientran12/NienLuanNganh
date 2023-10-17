// Trong orderService.js
import Order from '../models/Order.js';

// Hàm để tạo đơn hàng mới
export const createOrder = async (orderData) => {
    try {
        const newOrder = new Order(orderData);
        const savedOrder = await newOrder.save();
        return { status: 'success', data: savedOrder };
    } catch (error) {
        throw error;
    }
}

// Các hàm khác xử lý logic liên quan đến đơn hàng
