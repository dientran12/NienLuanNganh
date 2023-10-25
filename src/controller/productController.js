const productService = require('../services/productService');

const productController = {
  
  // createSize: async (req, res) => {
  //   try {
  //     const { name } = req.body;
  //     const newSize = await productService.createSize(name);
  //     res.status(201).json({ success: true, size: newSize });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ success: false, message: 'Internal Server Error' });
  //   }
  // },

  // createColor: async (req, res) => {
  //   try {
  //     const { name } = req.body;
  //     const newColor = await productService.createColor(name);
  //     res.status(201).json({ success: true, color: newColor });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ success: false, message: 'Internal Server Error' });
  //   }
  // },
  
  getProductDetail: async (req, res) => {
    const productId = req.params.productId; // Lấy ID sản phẩm từ request parameters
    try {
      const product = await productService.getProductById(productId);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'Product not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductByName: async (req, res) => {
    try {
      const name = req.params.name.trim();
      const productsWithDiscount = await productService.getByName(name);
      res.status(200).json({ success: true, products: productsWithDiscount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  findProductsByPriceRange: async (req, res) => {
    try {
      const { minPrice, maxPrice } = req.query;

      if (!minPrice || !maxPrice) {
        return res.status(400).json({ success: false, message: 'Invalid price range' });
      }

      const products = await productService.findProductsByPriceRange(minPrice, maxPrice);
      res.status(200).json({ success: true, products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const productsWithDiscount = await productService.getAllProducts();
      res.status(200).json({ success: true, products: productsWithDiscount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  getAllProductsOnPage: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1; // Chuyển đổi giá trị của page thành số nguyên, mặc định là 1 nếu không có giá trị
      const pageSize = parseInt(req.query.pageSize, 10) || 10; // Chuyển đổi giá trị của pageSize thành số nguyên, mặc định là 10 nếu không có giá trị     
      const productsWithDiscount = await productService.getProductsOnpage(page, pageSize);
      res.status(200).json(productsWithDiscount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },  
  // getAllProductsWithPage: async (req, res) => {
  //   try {
  //     const { page, pageSize } = req.query;

  //       const products = await productService.getProductsOnPage(page, pageSize);
  //       return res.status(200).json(products);
  //   } catch (error) {
  //       console.error(error);
  //       return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // },

  getByType: async (req, res) => {
    try {
      const type = req.params.type;
      const products = await productService.getByType(type);
      res.status(200).json({ success: true, products: products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  addQuantityToProduct: async (req, res) => {
    try {
      const { productName, sizeName, colorName, quantity } = req.body;
      const result = await productService.addQuantityToProduct(productName, sizeName, colorName, quantity);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(404).json(result);
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, description, type, price, origin, brand, gender } = req.body;

      const productData = {
        name: name,
        description: description,
        type: type,
        price: price,
        origin: origin,
        brand: brand,
        gender: gender,
      };    

      const updatedProduct = await productService.updateProductAndRelatedInfo(productId, productData);

      res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { name, description, type, price, origin, brand, gender } = req.body;
      const result = await productService.createProduct(name, description, type, price, origin, brand, gender);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(500).json(result);
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  deleteProductById: async (req, res) => {
    try {
      // const pageSize = parseInt(req.params.idProduct)
      const idProduct = req.params.idProduct;
      const result = await productService.deleteProductById(idProduct);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  addSizeAndColorToProduct: async (req, res) => {
    try {
      const { productId, sizeName, colorName, quantity } = req.body;
      const result = await productService.addSizeAndColorToProduct(productId, sizeName, colorName, quantity);
      if (result.success) {
        res.status(201).json(result.productDetail);
      } else {
        res.status(500).json({ message: result.message });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  applyPromotion: async (req, res) => {
    const { productId, promotionId } = req.body;
    const result = await productService.applyPromotionToProduct(productId, promotionId);
    return res.json(result);
  },

};

module.exports = productController;
