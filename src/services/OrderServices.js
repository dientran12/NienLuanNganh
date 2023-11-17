import { response } from 'express';
import db from '../models'
import * as emailService from './emailService';
const moment = require('moment');


export const addToOrder = async (userId, sizeItemId, quantity) => {
  try {
    const order = await db.Order.create({ userId });
    const userid = order.userId;
    const user = await db.User.findByPk(userid);
    const address = user.address;
    await db.Order.update({ shippingAddress: address }, { where: { id: order.id } });

    const sizeitem = await db.SizeItem.findByPk(sizeItemId);
    const versionId = sizeitem.versionId;
    const version = await db.Versions.findByPk(versionId);
    const productID = version.productId;
    const product = await db.Product.findByPk(productID);
    const price = product.price;
    const quantityproduct = sizeitem.quantity;

    if (quantity > quantityproduct) {
      return {
        success: true,
        message: "Không đủ sản phẩm trong kho",
      };
    } else {
      const orderDetail = await db.OrderDetail.create({
        orderId: order.id,
        sizeItemId: sizeItemId,
        quantity,
        price,
        totalPrice: 0,
      });

      const promotionProduct = await db.ProductPromotions.findOne({ where: { productId: productID } });

      if (promotionProduct) {
        const promotion = await db.Promotions.findByPk(promotionProduct.promotionId);

        // Kiểm tra xem khuyến mãi có hạn không
        const currentDate = new Date();
        console.log(currentDate)
        const startDate = promotion.startDate;
        console.log(startDate)
        const endDate = promotion.endDate;

        if ((currentDate < startDate || currentDate > endDate)) {
          return {
            success: false,
            message: 'Khuyến mãi đã hết hạn.',
          };
        } else {
          const promotionalPrice = price - (price * promotion.percentage) / 100;
          orderDetail.price = promotionalPrice;
          await orderDetail.save();
        }
      }

      const totalPrice = orderDetail.price * quantity;
      console.log(totalPrice)
      await orderDetail.update({ totalPrice });

      const totalAmount = await db.OrderDetail.sum('totalPrice', { where: { orderId: order.id } });
      await db.Order.update({ totalAmount }, { where: { id: order.id } });

      return {
        success: true,
        message: 'Product added to Order successfully',
        OrderDetail: orderDetail,
      };
    }
  } catch (error) {
    console.error('Error in addToOrder service:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};


export const updateorder = async (orderId, sizeItemId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let order = await db.Order.findByPk(orderId);
      const orderdetail = await db.OrderDetail.findOne({
        where: { orderId, sizeItemId: sizeItemId },
      });

      if (!orderdetail) {
        resolve({
          status: 'OK',
          message: 'Product is not defined',
        })
      }

      await orderdetail.update(data);

      orderdetail.totalPrice = orderdetail.quantity * orderdetail.price;

      orderdetail.save();

      resolve({
        status: 'OK',
        message: 'Update product SUCCESSFULLY',
        data: orderdetail
      })
    } catch (e) {
      reject(e)
    }
  })
}

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

    const userid = order.userId; // Lấy userId từ đối tượng order
    const user = await db.User.findByPk(userid); // Sử dụng userId để truy xuất người dùng

    const address = user.address;
    await db.Order.update({ shippingAddress: address }, {
      where: { id: order.id },
    });

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
        sizeItemId: cartItem.sizeItemId,
        quantity: cartItem.quantity,
        price: cartItem.price,
        totalPrice: 0,
      });


      const totalPrice = cartItem.price * cartItem.quantity;

      // Sau đó, cập nhật totalPrice trong OrderDetail
      await orderdetail.update({ totalPrice });

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


export const confirmOrder = async (orderId) => {
  try {
    const order = await db.Order.findOne({
      where: { id: orderId },
      include: [{ model: db.OrderDetail }]
    });

    const orderdetail = await db.OrderDetail.findOne({ where: { orderId: orderId } })
    console.log(orderdetail)

    if (!orderdetail) {
      return {
        mes: "đơn hàng không có sản phẩm"
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

      // Xác nhận đơn hàng
      order.confirmed = true;
      await order.save();

      // Gửi email xác nhận
      emailService.sendConfirmationEmail(userEmail);
    }

    order.status = 'Processing';
    await order.save();

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

export const getAllorderDetail = async (userId) => {
  try {
    // Bước 1: Tìm tất cả các đơn hàng của người dùng dựa trên userId
    const orders = await db.Order.findAll({ where: { userId: userId } });

    if (!orders || orders.length === 0) {
      return {
        success: true,
        message: 'Order is empty',
        orderdetail: [],
      };
    }

    // Bước 2 và 3: Tìm tất cả các mục trong đơn hàng chi tiết của mỗi đơn hàng của người dùng
    const orderdetail = [];
    for (const order of orders) {
      const orderItems = await db.OrderDetail.findAll({
        where: { orderId: order.id },
        include: [
          {
            model: db.Order, as: 'orderdata',
          },
          {
            model: db.SizeItem,
            as: 'productdata',
            include: [
              {
                model: db.Size,
                attributes: ['sizeName'],
              },
              {
                model: db.Versions,
                include: [
                  {
                    model: db.Color,
                    attributes: ['colorname'],
                  },
                  {
                    model: db.Product,
                    attributes: ['name', 'price'],
                  },
                ],
              },
            ],
          },
        ],
      });

      orderdetail.push(...orderItems);
    }


    return {
      success: true,
      message: 'OrderDetail retrieved successfully',
      orderdetail: orderdetail,
    };
  } catch (error) {
    console.error('Error in OrderDetail service:', error);
    return {
      success: false,
      message: 'Internal server error',
      orderdetail: [],
    };
  }
};


// services/OrderServices.js
export const addMultipleToOrder = async (userId, items, shippingAddress, paymentMethod) => {
  try {
    const order = await db.Order.create({ userId });

    const userid = order.userId;
    const user = await db.User.findByPk(userid);
    const address = user.address;

    const finalShippingAddress = shippingAddress || address;

    // Cập nhật shippingAddress trong bảng Order
    await db.Order.update({ shippingAddress: finalShippingAddress }, { where: { id: order.id } });

    if (!finalShippingAddress) {
      order.destroy();
      return {
        message: 'Không có địa chỉ giao hàng',
      };
    }

    const promises = items.map(async (item) => {
      const { sizeItemId, quantity } = item;

      const sizeItem = await db.SizeItem.findByPk(sizeItemId);

      // Kiểm tra xem sizeItem có tồn tại không
      if (!sizeItem) {
        return {
          success: false,
          message: "Sản phẩm không tồn tại.",
        };
      }
      const cartitem = await db.CartItem.findOne({ where: { sizeItemId: sizeItemId, cartId: userId } });
      console.log(cartitem)
      if (cartitem) {
        cartitem.destroy();
      }

      const versionId = sizeItem.versionId;
      const version = await db.Versions.findByPk(versionId);
      const productID = version.productId;
      const product = await db.Product.findByPk(productID);

      if (!product) {
        return {
          success: false,
          message: "Sản phẩm không tồn tại.",
        };
      }

      const price = product.price;
      const quantityproduct = sizeItem.quantity;

      if (quantity > quantityproduct) {
        return {
          success: false,
          message: "Không đủ sản phẩm trong kho",
        };
      } else {
        const orderDetail = await db.OrderDetail.create({
          orderId: order.id,
          sizeItemId: sizeItemId,
          quantity,
          price,
          totalPrice: 0,
        });

        const promotionProduct = await db.ProductPromotions.findOne({
          where: { productId: productID },
        });

        if (promotionProduct) {
          const promotion = await db.Promotions.findByPk(
            promotionProduct.promotionId
          );
          const currentDate = new Date();

          const startDate = moment(promotion.startDate, 'YYYY/MM/DD');
          const endDate = moment(promotion.endDate, 'YYYY/MM/DD');
          const currentDateMoment = moment(currentDate, 'YYYY/MM/DD');

          console.log(startDate, endDate, currentDateMoment)

          if (currentDateMoment < startDate || currentDateMoment > endDate) {
            
          } else {
            const promotionalPrice =
              price - (price * promotion.percentage) / 100;
            orderDetail.price = promotionalPrice;
            await orderDetail.save();
          }
        }

        console.log(orderDetail.price)
        const totalPrice = orderDetail.price * quantity;
        await orderDetail.update({ totalPrice });

        const totalAmount = await db.OrderDetail.sum('totalPrice', { where: { orderId: order.id } });
        await db.Order.update({ totalAmount }, { where: { id: order.id } });


        // Cập nhật số lượng của sizeItem
        await sizeItem.update({ quantity: quantityproduct - quantity });

        // Cập nhật soldQuantity của sản phẩm
        await product.update({ soldQuantity: product.soldQuantity + quantity });

        return {
          success: true,
          message: "Product added to Order successfully",
          orderDetail: orderDetail,
        };
      }
    });

    // Đợi tất cả các promises hoàn tất
    const results = await Promise.all(promises);

    // Kiểm tra kết quả và xử lý theo nhu cầu của bạn
    const successResults = results.filter((result) => result.success);
    const errorResults = results.filter((result) => !result.success);

    if (errorResults.length > 0) {
      return {
        success: false,
        message: "Có lỗi xảy ra khi thêm sản phẩm vào đơn hàng",
        errors: errorResults,
      };
    }

    return {
      success: true,
      message: "Products added to Order successfully",
      orderId: order.id,
      orderDetails: successResults.map((result) => result.orderDetail),
    };
  } catch (error) {
    console.error("Error in addMultipleToOrder service:", error);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};
