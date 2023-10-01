const db = require('../models'); // Import các model đã được tạo

const Product = db.Product; // Lấy model Product từ database

const productController = {
  // Tạo sản phẩm mới
  createProduct: async (req, res) => {
    try {
      const { name, description, price, origin, brand, type, gender } = req.body;
      const product = await Product.create({ name, description, price, origin, brand, type, gender });
      res.status(201).json({ success: true, product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Lấy thông tin của sản phẩm theo ID
  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);
      if (product) {
        res.status(200).json({ success: true, product });
      } else {
        res.status(404).json({ success: false, message: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Cập nhật thông tin sản phẩm theo ID
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, description, price, origin, brand, type, gender } = req.body;
      const product = await Product.findByPk(productId);
      if (product) {
        product.name = name;
        product.description = description;
        product.price = price;
        product.origin = origin;
        product.brand = brand;
        product.type = type;
        product.gender = gender;
        await product.save();
        res.status(200).json({ success: true, product });
      } else {
        res.status(404).json({ success: false, message: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Xóa sản phẩm theo ID
  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);
      if (product) {
        await product.destroy();
        res.status(204).json({ success: true });
      } else {
        res.status(404).json({ success: false, message: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Lấy danh sách tất cả sản phẩm
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).json({ success: true, products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
   // Lấy chi tiết sản phẩm theo ID
  getProductDetails: async (req, res) => {
      try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId, {
          include: [
            { model: db.ProductDetail, include: [db.Color, db.Size] },
          ],
        });
        
        if (product) {
          res.status(200).json({ success: true, product });
        } else {
          res.status(404).json({ success: false, message: 'Product not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
  },    
};

module.exports = productController;
