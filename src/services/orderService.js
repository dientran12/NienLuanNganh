import { DATE } from 'sequelize';
import db from '../models'
import { Order } from '../models';


export const addToOrder = async (cartItemID) => {
  try {
    const cartItem = await db.CartItem.findByPk(cartItemID);

    if (!cartItem) {
      return {
        success: false,
        message: 'Cart item not found',
      };
    }

    // Tạo đơn hàng (order) mới
    const order = await db.Order.create({
      cartItemsId: cartItem.id,
      // date: db.sequelize.literal('CURRENT_TIMESTAMP'),
      price: cartItem.price,
      quantity: cartItem.quantity,
      total: cartItem.price * cartItem.quantity,
      paymentId: cartItem.id,
      statusOrder: 'created',

      // ...Thêm các trường dữ liệu khác của đơn hàng (nếu có)
    });

    // Sau khi đơn hàng đã được tạo, bạn có thể xóa cartItem
    await cartItem.destroy();

    return {
      success: true,
      message: 'Order created and cartItem deleted successfully',
      order,
    };
  } catch (error) {
    console.error('Error in addToOrder service:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};


export const calculateOrderTotal = async (cartItemId) => {
  try {
    // Tìm chi tiết của cartItem
    const cartItem = await db.CartItem.findByPk(cartItemId);

    if (!cartItem) {
      return {
        success: false,
        message: 'Cart item not found',
      };
    }

    // Tính tổng đơn hàng dựa trên giá và số lượng từ cartItem
    const orderTotal = cartItem.price * cartItem.quantity;

    return {
      success: true,
      message: 'Order total calculated successfully',
      orderTotal,
    };
  } catch (error) {
    console.error('Error in calculateOrderTotal service:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};

export const deleteOrder = async (orderId) => {
  try {
    // Thực hiện logic để tìm đơn hàng cần xóa dựa trên orderId
    const order = await db.Order.findByPk(orderId);

    if (!order) {
      return {
        success: false,
        message: 'Order not found',
      };
    }

    await order.destroy();

    return {
      success: true,
      message: 'Order deleted successfully',
    };
  } catch (error) {
    console.error('Error in deleteOrder service:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};


// xac nhan don hang
export const confirmOrder = async (orderId) => {
  try {
    const order = await db.Order.findByPk(orderId);

    if (!order) {
      return {
        success: false,
        message: 'Order not found',
      };
    }

    if (order.statusOrder === 'confirmed') {
      return {
        success: false,
        message: 'Order has already been confirmed',
      };
    }

    // Thực hiện cập nhật trạng thái đơn hàng thành 'confirmed'
    order.statusOrder = 'confirmed';
    await order.save();

    return {
      success: true,
      message: 'Order confirmed successfully',
    };
  } catch (error) {
    console.error('Error in confirmOrder service:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};

//phương thức thanh toán
export const setPaymentMethod = async (orderId, paymentMethod) => {
  try {
    const order = await db.Order.findByPk(orderId);
    if (!order) {
      return {
        success: false,
        message: 'Order not found',
      };
    }

    if (paymentMethod === 'bankTransfer' || paymentMethod === 'cashOnDelivery') {
      order.paymentMethod = paymentMethod;
      order.statusOrder = 'Waiting for delivery';

      await order.save();

      return {
        success: true,
        message: 'Payment method set successfully',
        statusOrder: 'Waiting for delivery',
      };
    } else {
      return {
        success: false,
        message: 'Invalid payment method',
      };
    }
  } catch (error) {
    console.error('Error in setPaymentMethod service:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};

//xem thông tin đơn hàng
export const getOrderInfo = async (orderId) => {
    try {
        const order = await Order.findByPk(orderId);
        return { message: 'Order Information', data: order };

        //return order;
    } catch (error) {
        throw error;
    }
};


//cap nhat don hang
export const updateOrderById = async (orderId, newQuantity) => {
  try {
    const order = await db.Order.findByPk(orderId);

    if (!order) {
      return {
        success: false,
        message: 'Order not found',
      };
    }

    // Cập nhật số lượng và tính toán lại tổng
    order.quantity = newQuantity;
    order.total = order.price * newQuantity;

    // Lưu lại đơn hàng cập nhật
    await order.save();

    return {
      success: true,
      message: 'Order updated successfully',
      order,
    };
  } catch (error) {
    console.error('Error in updateOrderById service:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};





  
