import * as services from '../services/CartItemServices.js'

export const addtocartitem = async (req, res) => {
  try {
    
    const {userId, sizeItemId} = req.body; // Điền userId của người dùng từ session hoặc tham số đường dẫn

    if (!sizeItemId) {
      return res.status(400).json({
        err: 1,
        mes: 'Missing payload',
      });
    }

    const response = await services.addToCartItem(userId, sizeItemId);

    if (response.success) {
      return res.status(201).json({
        status: 'OK',
        message: response.message,
        cartItem: response.newcartitem,
      });
    } else {
      return res.status(404).json({
        err: -1,
        message: response.message,
        cartItem: response.cartItem,
      });
    }
  } catch (error) {
    console.error('Error in addtocartitem controller:', error);
    return res.status(500).json({
      err: -1,
      message: 'Internal server error',
    });
  }
};
  

export const updatecart = async (req, res) => {
    try {
        const sizeItemId = req.params.sizeItemId
        const userId = req.params.userId
        const data = req.body
        if (!sizeItemId) {
            return res.status(200).json({
                status: "error",
                message: "The Id is required"
            })
        }
        const response = await services.updatecart(userId, sizeItemId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const deletecart = async (req, res) => {
    try {
        const sizeItemId = req.params.sizeItemId
        const userId = req.params.userId
        if (!sizeItemId) {
            return res.status(200).json({
                status: "error",
                message: "The Id is required"
            })
        }
        const response = await services.deletecart(userId,sizeItemId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: "Iternal server error"
        })
    }
}

export const getCartItem = async (req, res) => {
    try {
        const cartID = req.params.id
        const response = await services.getCartItem(cartID)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: "con cac"
        })
    }
}

export const getAllCartItemController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await services.getAllCartItem(userId);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message,
        cartItemsWithDiscount: result.cartItemsWithDiscount,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.error('Error in getAllCartItemController:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};