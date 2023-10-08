import * as services from '../services/CartItemServices.js'


// controllers/cartController.js
import { addToCartItem } from '../services/CartItemServices.js';

export const addtocartitem = async (req, res) => {
  try {
    
    const userId = req.params.userId; // Điền userId của người dùng từ session hoặc tham số đường dẫn
    const productId = req.params.productId;

    if (!productId) {
      return res.status(400).json({
        err: 1,
        mes: 'Missing payload',
      });
    }

    const response = await addToCartItem(userId, productId);

    if (response.success) {
      return res.status(200).json({
        status: 'OK',
        message: response.message,
        cartItem: response.cartItem,
      });
    } else {
      return res.status(404).json({
        err: -1,
        message: response.message,
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
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(200).json({
                status: "error",
                message: "The Id is required"
            })
        }
        const response = await services.updatecart(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const deletecart = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: "error",
                message: "The Id is required"
            })
        }
        const response = await services.deletecart(productId)
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