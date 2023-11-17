import { response } from 'express';
import db from '../models'
const { Op, literal } = require('sequelize');
const currentDate = new Date();

// Trong service (CartItemServices.js)
// import { Cart, CartItem } from '../models'; // Import các model cần thiết

export const addToCartItem = async (userId, sizeItemId) => {
  try {
    // Tìm giỏ hàng của người dùng dựa trên userId
    let cart = await db.Cart.findOne({ where: { userId: userId } });

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
    const sizeitem =await db.SizeItem.findByPk(sizeItemId)
    const versionId=sizeitem.versionId
    const version= await db.Versions.findByPk(versionId)
    const productId=version.productId
    const product =await db.Product.findByPk(productId)
    const discount = product.price
    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, tạo mới
    const newcartitem = await db.CartItem.create({
      cartId: cart.id,
      sizeItemId: sizeItemId,
      discount,
      quantity: 1, // Đặt quantity thành 1 khi thêm sản phẩm mới vào giỏ hàng
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
      where: { cartId: cart.id },
      include: [
        {
          model: db.Cart,
          as: 'cartdata',
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
                  attributes: ['id', 'name', 'price'],
                  include: [
                    {
                      model: db.Promotions,
                      attributes: ['id', 'percentage', 'startDate', 'endDate'],
                      through: {
                        model: db.ProductPromotions,
                        attributes: [],
                      },
                      required: false,
                      where: {
                        [Op.or]: [
                          {
                            startDate: { [Op.lte]: currentDate },
                            endDate: { [Op.gte]: currentDate },
                          },
                          {
                            startDate: { [Op.is]: null },
                            endDate: { [Op.is]: null },
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    // Tính toán giá mới và thông tin khuyến mãi cho mỗi CartItem
    const cartItemsWithDiscount = cartItems.map((cartItem) => {
      const product = cartItem.productdata.Version.Product;
      const hasPromotion = product.Promotions && product.Promotions.length > 0;
      const discountPercentage = hasPromotion ? product.Promotions[0].percentage : 0;

      // Tính toán giá mới theo yêu cầu
      const discountedPrice = hasPromotion
        ? product.price - (product.price * (discountPercentage / 100))
        : null;

      // Gán thông tin khuyến mãi và giảm giá vào cartItem
      return {
        ...cartItem.get({ plain: true }),
        discountPercentage: hasPromotion ? discountPercentage : null,
        discountedPrice: discountedPrice,
      };
    });

    return {
      success: true,
      message: 'Cart items retrieved successfully',
      cartItemsWithDiscount: cartItemsWithDiscount,
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


