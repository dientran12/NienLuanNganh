import { response } from 'express';
import db from '../models'

// Trong service (CartItemServices.js)
// import { Cart, CartItem } from '../models'; // Import các model cần thiết

export const addToCartItem = async (userId, productId) => {
  try {
    // Tìm giỏ hàng của người dùng dựa trên userId
    let cart = await db.Cart.findOne({ where: { userID: userId } });

    if (!cart) {
      // Nếu không có giỏ hàng cho userId, tạo giỏ hàng mới
      cart = await db.Cart.create({ userID: userId });
    }

    // Tìm sản phẩm trong giỏ hàng dựa trên productId
    const cartItem = await db.CartItem.findOne({
      where: { cartID: cart.id, productID: productId },
    });

    if (cartItem) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng quantity lên 1
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, tạo mới
      await db.CartItem.create({
        cartID: cart.id,
        productID: productId,
        quantity: 1, // Đặt quantity thành 1 khi thêm sản phẩm mới vào giỏ hàng
        price: 100, // Thay thế bằng giá của sản phẩm
      });
    }

    return {
      success: true,
      message: 'Product added to cart successfully',
      cartItem: cartItem
    };
  } catch (error) {
    console.error('Error in addToCartItem service:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};


export const updatecart = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await db.CartItem.findByPk(id)
            console.log('product ' + id + ' dataUpdate in backend ', data)
            if (!products) {
                resolve({
                    status: 'OK',
                    message: 'Product is not defined',
                })
            }
            await products.update(data);
            console.log(products)
            resolve({
                status: 'OK',
                message: 'Update product SUCCESSFULLY',
                data: products 
            })
        } catch (e) {
            reject(e)
        }
    })
}

export const deletecart = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            const products = await db.CartItem.findByPk(id)

            if (!products) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined',
                })
            }
            await products.destroy();

            resolve({
                status: 'OK',
                message: `Delete product SUCCESSFULLY`
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
            include:[{ model: db.Cart, as: 'cartdata'}, { model: db.Product, as: 'productdata'}]
        })
        resolve({
            err: response ? 0:1,
            mes: response ? '':'',
            data: cartID
        })
    } catch (e) {
        reject(e)
    }
})

export const getAllCartItem = async (userId) => {
  try {
    // Tìm giỏ hàng của người dùng dựa trên userId
    const cart = await db.Cart.findOne({ where: { userID: userId } });

    if (!cart) {
      return {
        success: true,
        message: 'Cart is empty',
        cartItems: [],
      };
    }

    // Tìm tất cả các mục trong giỏ hàng của người dùng
    const cartItems = await db.CartItem.findAll({
      where: { cartID: cart.id },
      include:[{ model: db.Cart, as: 'cartdata'}, { model: db.Product, as: 'productdata'}]
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
