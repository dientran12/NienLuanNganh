const db = require('../models');
const Product = db.Product;

const productController = {
  create: async (req, res) => {
    try {
      const { name, description, type, price, origin, brand, gender } = req.body;
      const newProduct = await Product.create({ name, description, type, price, origin, brand, gender });
      res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  delete: async (req, res) => {
    try {
      const idProduct = req.params.id;
      const product = await Product.findByPk(idProduct);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      await product.destroy();
      res.status(204).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  update: async (req, res) => {
    try {
      const idProduct = req.params.id;
      const { name, description, type, price, origin, brand, gender } = req.body;
      const product = await Product.findByPk(idProduct);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      product.name = name;
      product.description = description;
      product.type = type;
      product.price = price;
      product.origin = origin;
      product.brand = brand;
      product.gender = gender;
      await product.save();
      res.status(200).json({ success: true, product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getAll: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).json({ success: true, products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getDetail: async (req, res) => {
    try {
      // const idProduct = req.params.id;
      // const product = await Product.findByPk(idProduct);
      const { id } = req.params;

        // Tìm sản phẩm trong database dựa trên ID
        const product = await db.Product.findOne({
            where: { idProduct: id },
            // Bạn có thể chọn các trường bạn muốn lấy ở đây
            attributes: ['idProduct', 'name', 'description', 'price', 'origin', 'brand', 'type', 'gender', 'createdAt', 'updatedAt']
        });
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.status(200).json({ success: true, product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getByName: async (req, res) => {
    try {
      const name = req.params.name;
      const products = await Product.findAll({
        where: {
          name: name
        }
      });
      res.status(200).json({ success: true, products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getByType: async (req, res) => {
    try {
      const type = req.params.type;
      const products = await Product.findAll({
        where: {
          type: type
        }
      });
      res.status(200).json({ success: true, products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
};

module.exports = productController;
