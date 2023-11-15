import { response } from 'express';
import db from '../models'

// Trong service (CartItemServices.js)
// import { Cart, CartItem } from '../models'; // Import các model cần thiết

export const addToCartItem = async (userId, sizeItemId, quantity) => {
  try {
    // Tìm giỏ hàng của người dùng dựa trên userId
    let cart = await db.Cart.findOne({ where: { userId: userId } });

    const sizeitem = await db.SizeItem.findByPk(sizeItemId);
    const versionid = sizeitem.versionId;
    const Versions = await db.Versions.findByPk(versionid);
    const productID = Versions.productId;

    const product = await db.Product.findByPk(productID);
    const price = product.price*quantity;

    if (!cart) {
      // Nếu không có giỏ hàng cho userId, tạo giỏ hàng mới
      cart = await db.Cart.create({ userId: userId });
    }

    // Tìm sản phẩm trong giỏ hàng dựa trên productId
    const cartItem = await db.CartItem.findOne({
      where: { cartID: cart.id, sizeItemId: sizeItemId },
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
      sizeItemId: sizeItemId,
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


export const updatecart = async (userId, sizeItemId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await db.Cart.findOne({ where: { userId: userId } });
      const cartItem = await db.CartItem.findOne({
        where: { cartId: cart.id, sizeItemId: sizeItemId },
      });
      console.log('product ' + sizeItemId + ' dataUpdate in backend ', data)
      if (!cartItem) {
        resolve({
          status: 'OK',
          message: 'Product is not defined',
        })
      }
      await cartItem.update(data);

      const sizeitem = await db.SizeItem.findByPk(sizeItemId)
      const version = await db.Versions.findByPk(sizeitem.versionId)
      const product = await db.Product.findByPk(version.productId)
      cartItem.price = cartItem.quantity*product.price;

      cartItem.save();
      
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

export const deletecart = async (userId, sizeItemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await db.Cart.findOne({ where: { userId: userId } });

      const cartItem = await db.CartItem.findOne({
        where: { cartId: cart.id, sizeItemId: sizeItemId },
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
      include: [{ model: db.Cart, as: 'cartdata' }, { model: db.SizeItem, as: 'productdata' }]
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
      include: [
        {
          model: db.Cart, as:'cartdata'
        },
        {
          model: db.SizeItem,
          as: 'productdata',
          include: [
            {
              model: db.Size,
              attributes:['sizeName']
            },
            {
              model: db.Versions,
              include: [
                {
                  model: db.Color,
                  attributes: ['colorname'], // Include only the colorname field
                },
                {
                  model: db.Product,
                  attributes:['name']
                }
              ],
            },
          ],
        },
      ],
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
