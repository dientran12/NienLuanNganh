import * as services from '../services/OrderServices.js'


// export const addtoOrder= async (req, res) => {
//   try {
    
//     const userId = req.params.userId; // Điền userId của người dùng từ session hoặc tham số đường dẫn
//     const sizeItemId = req.body.sizeItemId;
//     const quantity = req.body.quantity;

//     if (!sizeItemId) {
//       return res.status(400).json({
//         err: 1,
//         mes: 'Missing payload',
//       });
//     }

//     const response = await services.addToOrder(userId, sizeItemId, quantity);

//     if (response.success) {
//       return res.status(201).json({
//         status: 'OK',
//         message: response.message,
//         OrderDetail: response.OrderDetail,
//       });
//     } else {
//       return res.status(404).json({
//         err: -1,
//         message: response.message,
//       });
//     }
//   } catch (error) {
//     console.error('Error in addtoOrder controller:', error);
//     return res.status(500).json({
//       err: -1,
//       message: 'Internal server error',
//     });
//   }
// };

// export const updateorder = async (req, res) => {
//   try {
//       const sizeItemId = req.params.sizeItemId
//       const orderId = req.params.orderId
//       const data = req.body
//       if (!sizeItemId) {
//           return res.status(200).json({
//               status: "error",
//               message: "The Id is required"
//           })
//       }
//       const response = await services.updateorder(orderId, sizeItemId, data)
//       return res.status(200).json(response)
//   } catch (e) {
//       return res.status(404).json({
//           message: e
//       })
//   }
// }


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


export const confirmOrder = async (req, res) => {
  try {

    const orderId=req.params.orderId
    const order = await services.confirmOrder(orderId);
  
    if (order && order.mes) {
      return res.status(400).json({
        success: false,
        message: order.mes,
      });
    }
  
    const userEmail = order.User.email;
    const emailResult = await services.sendConfirmationEmail(userEmail);
  
    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi gửi email: ' + emailResult.message,
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

export const getAllorderDetail = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await services.getAllorderDetail(userId);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message,
        orderdetail: result.orderdetail,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.error('Error :', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


export const addMultipleToOrderController = async (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentMethod } = req.body; // Lấy thông tin từ request body

    // Gọi hàm service để thêm sản phẩm vào đơn hàng
    const result = await services.addMultipleToOrder(userId, items, shippingAddress, paymentMethod );

    // Kiểm tra kết quả từ hàm service và trả về phản hồi tương ứng
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message,
        orderId: result.orderId,
        orderDetails: result.orderDetails,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message,
        errors: result.errors,
      });
    }
  } catch (error) {
    console.error('Error in addMultipleToOrderController:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
