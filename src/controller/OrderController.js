import * as services from '../services/OrderServices.js'


export const addtoOrder= async (req, res) => {
  try {
    
    const userId = req.params.userId; // Điền userId của người dùng từ session hoặc tham số đường dẫn
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    if (!productId) {
      return res.status(400).json({
        err: 1,
        mes: 'Missing payload',
      });
    }

    const response = await services.addToOrder(userId, productId, quantity);

    if (response.success) {
      return res.status(200).json({
        status: 'OK',
        message: response.message,
        OrderDetail: response.OrderDetail,
      });
    } else {
      return res.status(404).json({
        err: -1,
        message: response.message,
      });
    }
  } catch (error) {
    console.error('Error in addtoOrder controller:', error);
    return res.status(500).json({
      err: -1,
      message: 'Internal server error',
    });
  }
};


export const cancelOrderController = async (req, res) => {
  const orderId = req.params.orderId; // Lấy orderId từ tham số URL

  try {
    const result = await services.cancelOrder(orderId);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(400).json({ error: result.message });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const moveFromCartToNewOrderController = async (req, res) => {
  const { userId, cartItemIds } = req.body;

  try {
    const results = await services.moveFromCartToNewOrder(userId, cartItemIds);

    const successResults = results.filter((result) => result.success);
    const errorResults = results.filter((result) => !result.success);

    if (successResults.length === results.length) {
      return res.status(200).json({ message: 'Products moved from cart to new order successfully' });
    } else {
      return res.status(400).json({ errors: errorResults.map((result) => result.message) });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const confirmOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const {shippingAddress, paymentMethod} = req.body;
    const order = await services.confirmOrder(orderId, shippingAddress, paymentMethod);

    if (!order) {
      return res.status(400).json({
        success: false,
        message: 'Không thể xác nhận đơn hàng do thiếu thông tin liên hệ',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Đơn hàng đã được xác nhận thành công',
      order: order,
    });
  } catch (error) {
    console.error('Lỗi khi xác nhận đơn hàng:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ nội bộ',
    });
  }
};

export const getTotalForMonth = async (req, res) => {
  const { month, year } = req.body;
  const total = await services.calculateTotalForMonth(month, year);

  if (total !== null) {
    res.json({ total });
  } else {
    res.status(500).json({ error: 'Lỗi khi tính tổng giá trị đơn hàng trong tháng.' });
  }
};