import { response } from 'express';
import db from '../models'

// Trong service (CartItemServices.js)
// import { Cart, CartItem } from '../models'; // Import các model cần thiết

export const addToCartItem = async (userId, versionId, quantity) => {
  try {
    // Tìm giỏ hàng của người dùng dựa trên userId
    let cart = await db.Cart.findOne({ where: { userId: userId } });

    const Versions = await db.Versions.findByPk(versionId);
    const productID = Versions.productId;

    const product = await db.Product.findByPk(productID);
    const price = product.price;

    if (!cart) {
      // Nếu không có giỏ hàng cho userId, tạo giỏ hàng mới
      cart = await db.Cart.create({ userId: userId });
    }

    // Tìm sản phẩm trong giỏ hàng dựa trên productId
    const cartItem = await db.CartItem.findOne({
      where: { cartID: cart.id, versionID: versionId },
    });

    if (cartItem) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng quantity lên 1
      return {
        success: false,
        message: 'Product already exists',
        cartItem,
      }
    }
    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, tạo mới
    const newcartitem = await db.CartItem.create({
      cartId: cart.id,
      versionId: versionId,
      quantity, // Đặt quantity thành 1 khi thêm sản phẩm mới vào giỏ hàng
      price, // Thay thế bằng giá của sản phẩm
    });

    return {
      success: true,
      message: 'Product added to cart successfully',
      newcartitem,
    };

  } catch (error) {
    console.error('Error in addToCartItem service:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};


export const updatecart = async (userId, versionId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await db.Cart.findOne({ where: { userId: userId } });
      const cartItem = await db.CartItem.findOne({
        where: { cartId: cart.id, versionId: versionId },
      });
      console.log('product ' + versionId + ' dataUpdate in backend ', data)
      if (!cartItem) {
        resolve({
          status: 'OK',
          message: 'Product is not defined',
        })
      }
      await cartItem.update(data);
      console.log(cartItem)
      resolve({
        status: 'OK',
        message: 'Update product SUCCESSFULLY',
        data: cartItem
      })
    } catch (e) {
      reject(e)
    }
  })
}

export const deletecart = async (userId, versionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await db.Cart.findOne({ where: { userId: userId } });

      const cartItem = await db.CartItem.findOne({
        where: { cartId: cart.id, versionId: versionId },
      });

      if (!cartItem) {
        resolve({
          status: 'OK',
          message: 'The product is not defined',
        })
      }
      await cartItem.destroy();

      resolve({
        status: 'OK',
        message: `Delete product SUCCESSFULLY`,
        cartItem,
      })
    } catch (e) {
      reject(e)
    }
  })
}

export const getCartItem = async (id) => new Promise(async (resolve, reject) => {
  try {
    const cartID = await db.CartItem.findOne({
      where: { id },
      include: [{ model: db.Cart, as: 'cartdata' }, { model: db.Versions, as: 'productdata' }]
    })
    resolve({
      err: response ? 0 : 1,
      mes: response ? '' : '',
      data: cartID
    })
  } catch (e) {
    reject(e)
  }
})

export const getAllCartItem = async (userId) => {
  try {
    // Tìm giỏ hàng của người dùng dựa trên userId
    const cart = await db.Cart.findOne({ where: { userId: userId } });

    if (!cart) {
      return {
        success: true,
        message: 'Cart is empty',
        cartItems: [],
      };
    }

    // Tìm tất cả các mục trong giỏ hàng của người dùng
    const cartItems = await db.CartItem.findAll({
      where: { cartId: cart.id },
      include: [{ model: db.Cart, as: 'cartdata' }, { model: db.Versions, as: 'productdata' }]
    });

    return {
      success: true,
      message: 'Cart items retrieved successfully',
      cartItems: cartItems,
    };
  } catch (error) {
    console.error('Error in getAllCartItem service:', error);
    return {
      success: false,
      message: 'Internal server error',
      cartItems: [],
    };
  }
};
