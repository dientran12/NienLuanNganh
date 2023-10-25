import * as services from '../services/orderService.js';

export const addToOrder = async (req, res) => {
  try {
    const { cartItemID } = req.params;
    const result = await services.addToOrder(cartItemID);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Error in addToOrder controller:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const calculateOrderTotal = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const result = await services.calculateOrderTotal(cartItemId);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Error in calculateOrderTotal controller:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // Lấy orderId từ tham số của URL
    const result = await services.deleteOrder(orderId);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result); // Trả về lỗi nếu không tìm thấy đơn hàng
    }
  } catch (error) {
    console.error('Error in deleteOrder controller:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};



export const confirmOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // Lấy orderId từ tham số của URL
    const result = await services.confirmOrder(orderId);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result); // Trả về lỗi nếu không tìm thấy đơn hàng hoặc đã được xác nhận
    }
  } catch (error) {
    console.error('Error in confirmOrder controller:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const setPaymentMethod = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { paymentMethod } = req.body;
    const result = await services.setPaymentMethod(orderId, paymentMethod);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Error in setPaymentMethod controller:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getOrderInfo = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await services.getOrderInfo(orderId);

        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Controller để cập nhật số lượng đơn hàng

export const updateOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { newQuantity } = req.body;
    const result = await services.updateOrderById(orderId, newQuantity);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Error in updateOrderById controller:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};






