import { response } from 'express';
import db from '../models'
import * as emailService from './emailService';

export const addToOrder = async (userId, versionId, quantity) => {
  try {

    const order = await db.Order.create({ userId });
    const userid = order.userId; // Lấy userId từ đối tượng order
    const user = await db.User.findByPk(userid); // Sử dụng userId để truy xuất người dùng

    const address = user.address;
    await db.Order.update({ shippingAddress: address }, {
      where: { id: order.id },
    });




    const version = await db.Versions.findByPk(versionId);
    const productID = version.productId;
    const product = await db.Product.findByPk(productID);
    const price = product.price;
    const sizeitem = await db.SizeItem.findOne({ where: { versionId: versionId } })
    const quantityproduct = sizeitem.quantity;

    if (quantity > quantityproduct) {
      return {
        success: true,
        message: "Khong du sp",
      }
    } else {
      const orderDetail = await db.OrderDetail.create({
        orderId: order.id,
        versionId: versionId,
        quantity,
        price,
        totalPrice: 0,
      });

      const totalPrice = price * quantity;

      // Sau đó, cập nhật totalPrice trong OrderDetail
      await orderDetail.update({ totalPrice });

      // Tính toán tổng giá trị của tất cả các mục đơn hàng trong đơn hàng
      const totalAmount = await db.OrderDetail.sum('totalPrice', {
        where: { orderId: order.id },
      });

      // Cập nhật trường totalAmount trong đơn hàng
      await db.Order.update({ totalAmount }, {
        where: { id: order.id },
      });
      return {
        success: true,
        message: 'Product added to Order successfully',
        OrderDetail: orderDetail
      };
    }
  } catch (error) {
    console.error('Error in addToOrderDetail service:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};

// Tạo một service cho việc hủy đơn hàng
export const cancelOrder = async (orderId) => {
  try {
    // Tìm đơn hàng dựa trên orderId
    const order = await db.Order.findByPk(orderId, { include: db.OrderDetail });

    if (!order) {
      return {
        success: false,
        message: 'Order not found',
      };
    }

    // Xóa tất cả các mục đơn hàng liên quan
    await db.OrderDetail.destroy({ where: { orderId } });

    // Xóa đơn hàng
    await order.destroy();

    return {
      success: true,
      message: 'Order canceled successfully',
      order
    };
  } catch (error) {
    console.error('Error in cancelOrder service:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};


export const moveFromCartToNewOrder = async (userId, cartItemIds) => {
  try {
    // Tạo một đơn hàng mới cho người dùng
    const order = await db.Order.create({ userId });

    // Tạo một mảng các promise để chuyển từ giỏ hàng sang đơn hàng
    const promises = cartItemIds.map(async (cartItemId) => {
      const cartItem = await db.CartItem.findByPk(cartItemId);

      if (!cartItem) {
        order.destroy();
        return {
          success: false,
          message: 'Cart item not found',
        };
      }

      // Tạo một mục đơn hàng mới từ thông tin mục giỏ hàng
      const orderdetail = await db.OrderDetail.create({
        orderId: order.id,
        versionId: cartItem.versionID,
        quantity: cartItem.quantity,
        price: cartItem.price,
        totalPrice: 0,
      });


      const totalPrice = cartItem.price * cartItem.quantity;

      // Tính toán tổng giá trị của tất cả các mục đơn hàng trong đơn hàng
      const totalAmount = await db.OrderDetail.sum('totalPrice', {
        where: { orderId: order.id },
      });

      // Cập nhật trường totalAmount trong đơn hàng
      await db.Order.update({ totalAmount }, {
        where: { id: order.id },
      });

      // Sau đó, cập nhật totalPrice trong OrderDetail
      await orderdetail.update({ totalPrice });

      return {
        success: true,
        message: 'Product moved from cart to order successfully',
        orderdetail,
      };
    });

    // Chờ tất cả các promise hoàn thành
    const results = await Promise.all(promises);

    return results;
  } catch (error) {
    console.error('Error in moveFromCartToNewOrder service:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};

export const confirmOrder = async (orderId, shippingAddress, paymentMethod) => {
  try {
    const order = await db.Order.findOne({
      where: { id: orderId },
      include: [{ model: db.OrderDetail }]
    });


    await order.update({ shippingAddress, paymentMethod })

    // Lấy thông tin sản phẩm trong đơn hàng
    const orderDetails = await db.OrderDetail.findAll({
      where: { orderId },
    });


    // console.log(orderDetails)

    if (!orderDetails || orderDetails.length === 0) {
      throw new Error('Không có thông tin sản phẩm trong đơn hàng');
    }

    // Cập nhật số lượng sản phẩm còn lại sau khi xác nhận đơn hàng
    for (const orderDetail of orderDetails) {
      const product = await db.SizeItem.findOne({ where: { versionId: orderDetail.versionId } });

      const cartitem = await db.CartItem.findOne({ where: { versionID: orderDetail.versionId } })

      const version = await db.Versions.findByPk(product.versionId)

      if (!product) {
        throw new Error(`Không tìm thấy sản phẩm với ID ${orderDetail.versionId}`);
      }

      // Giảm số lượng sản phẩm còn lại
      product.quantity -= orderDetail.quantity;

      // console.log("quantity " + product.quantity)

      if (product.quantity < 0) {
        return {
          success: true,
          message: "SP khong du",
        }
      }

      // Sử dụng Sequelize để truy xuất thông tin người dùng
      const user = await db.User.findByPk(order.userId);

      // Lấy email của người dùng
      const userEmail = user.email;

      if (order.confirmed) {
        return {
          mes: "Đơn hàng đã được xác nhận trước đó"
        }
      } else {
        // Gửi email xác nhận
        emailService.sendConfirmationEmail(userEmail);
      }
      await product.save();

      const productId = version.productId
      const soldproduct = await db.Product.findByPk(productId);

      soldproduct.soldQuantity += orderDetail.quantity;
      soldproduct.update(soldproduct.soldQuantity);
      await soldproduct.save();

      if (!cartitem) {
        console.log("không có cartitem")
      } else {
        cartitem.destroy();
      }
    }

    // Xác nhận đơn hàng
    order.confirmed = true;
    await order.save();

    order.status = 'Processing';
    await order.save();

    const confirmedOrderCount = await db.Order.count({
      where: { confirmed: true },
    });

    if (confirmedOrderCount > 10) {
      const minIdOrder = await db.Order.findOne({
        order: [['id', 'ASC']],
        where: { confirmed: true },
      });

      const orderdetail = await db.OrderDetail.findOne({
        where: { orderId: minIdOrder.id }
      })

      orderdetail.destroy();

      await minIdOrder.destroy();

      console.log(`Đã xóa đơn hàng có ID: ${minIdOrder.id}`);
    }

    return order;
  } catch (error) {
    console.error('Lỗi khi xác nhận đơn hàng:', error);
    return null;
  }
};

export const calculateTotalForMonth = async (month, year) => {
  try {
    const startDate = new Date(year, month - 1, 1); // Ngày bắt đầu của tháng
    const endDate = new Date(year, month, 0); // Ngày cuối của tháng

    // Truy vấn cơ sở dữ liệu để lấy tổng giá trị các đơn hàng trong tháng và năm cụ thể
    const totalAmount = await db.Order.sum('totalAmount', {
      where: {
        createdAt: {
          [db.Sequelize.Op.between]: [startDate, endDate],
        },
      },
    });

    const totalOrders = await db.Order.count({
      where: {
        createdAt: {
          [db.Sequelize.Op.between]: [startDate, endDate],
        },
      },
    });

    return {
      totalAmount: totalAmount || 0,
      totalOrders: totalOrders || 0,
    };
  } catch (error) {
    console.error('Lỗi khi tính tổng giá trị đơn hàng trong tháng:', error);
    return null;
  }
};