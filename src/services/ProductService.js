const db = require('../models/index');

const createProduct = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newProduct = await db.Product.create({
                name: data.name,
                description: data.description,
                price: data.price,
                
            });

            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'Create product successfully',
                    data: newProduct
                });
            } else {
                reject({
                    status: 'error',
                    message: 'Failed to create product'
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getAllProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allProducts = await db.Product.findAll();
            resolve({
                status: 'OK',
                message: 'Get All Products Successfully',
                data: allProducts
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getProductDetails = async (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await db.Product.findByPk(productId);
            if (product) {
                resolve({
                    status: 'OK',
                    message: 'Get product details successfully',
                    data: product
                });
            } else {
                reject({
                    status: 'error',
                    message: 'Product not found'
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const updateProduct = async (productId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await db.Product.findByPk(productId);
            if (product) {
                const updatedProduct = await product.update(data);
                resolve({
                    status: 'OK',
                    message: 'Update product successfully',
                    data: updatedProduct
                });
            } else {
                reject({
                    status: 'error',
                    message: 'Product not found'
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const deleteProduct = async (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await db.Product.findByPk(productId);
            if (product) {
                await product.destroy();
                resolve({
                    status: 'OK',
                    message: 'Delete product successfully'
                });
            } else {
                reject({
                    status: 'error',
                    message: 'Product not found'
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

export default {
    createProduct,
    getAllProducts,
    getProductDetails,
    updateProduct,
    deleteProduct
};
