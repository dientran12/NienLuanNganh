const productService = require('../services/productService');

const productController = {
  
  getAllUniqueTypes: async (req, res) => {
    try {
      const uniqueBrand = await productService.getAllUniqueTypes();
      res.json({ success: true, types: uniqueBrand });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  getAllUniqueBrand: async (req, res) => {
    try {
      const uniqueBrand = await productService.getAllUniqueBrand();
      res.json({ success: true, types: uniqueBrand });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  getAllUniqueOrigin: async (req, res) => {
    try {
      const uniqueOrigin = await productService.getAllUniqueOrigin();
      res.json({ success: true, types: uniqueOrigin });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },
  
  getProductDetail: async (req, res) => {
    const productId = req.params.id; // Lấy ID sản phẩm từ request parameters
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
      const name = req.query.name;
      const productsWithDiscount = await productService.getByName(name);
      res.status(200).json({ success: true, products: productsWithDiscount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getProductByNameWithImage: async (req, res) => {
    try {
      const name = req.query.name;
      const productsWithDiscount = await productService.getByNameWithImage(name);
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

  getAllProductsCustomer: async (req, res) => {
    try {
      const productsWithDiscount = await productService.getAllProductsCustomer();
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

  getByType: async (req, res) => {
    try {
      const type = req.query.type;
      const products = await productService.getByType(type);
      res.status(200).json({ success: true, products: products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getByTypeHaveImage: async (req, res) => {
    try {
      const type = req.query.type;
      const products = await productService.getByTypeHaveImage(type);
      res.status(200).json({ success: true, products: products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getByBrand: async (req, res) => {
    try {
      const brand = req.query.brand;
      const products = await productService.getByBrand(brand);
      res.status(200).json({ success: true, products: products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getByBrandHaveImage: async (req, res) => {
    try {
      const brand = req.query.brand;
      const products = await productService.getByBrandHaveImage(brand);
      res.status(200).json({ success: true, products: products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getByOrigin: async (req, res) => {
    try {
      const origin = req.query.origin;
      const products = await productService.getByOrigin(origin);
      res.status(200).json({ success: true, products: products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getByOriginHaveImage: async (req, res) => {
    try {
      const origin = req.query.origin;
      const products = await productService.getByOriginHaveImage(origin);
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

        // Lấy danh sách id danh mục từ req.body (giả sử được gửi dưới dạng mảng categoryIds)
        const { categoryIds = [] } = req.body;

        const updatedProduct = await productService.updateProductAndCategories(productId, productData, categoryIds);

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
      const id = req.params.id;
      const result = await productService.deleteProductById(id);
      
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

  getPricesLowToHigh: async (req, res) => {
    try {
      const productsWithDiscount = await productService.getPricesLowToHigh();
      res.status(200).json({ success: true, products: productsWithDiscount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getPricesHighToLow: async (req, res) => {
    try {
      const productsWithDiscount = await productService.getPricesHighToLow();
      res.status(200).json({ success: true, products: productsWithDiscount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getTotalQuantityForProductController: async (req, res) => {
    try {
      const productId = req.params.productId; // Lấy productId từ tham số của URL
  
      // Gọi service để tính tổng số lượng sản phẩm
      const totalQuantity = await productService.getTotalQuantityForProduct(productId);
  
      // Trả về kết quả thành công
      res.status(200).json({ success: true, Data: totalQuantity });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getQuantityVersion: async (req, res) => {
    try {
      const { productId, sizeId, colorId } = req.params;
  
      // Kiểm tra xem productId, sizeId, colorId có được truyền vào không
      if (!productId || !sizeId || !colorId) {
        return res.status(400).json({ success: false, message: 'Sản phẩm, size hoặc màu không xác định' });
      }
  
      // Gọi hàm service để lấy tổng số lượng
      const totalQuantity = await productService.getQuantityVersion(productId, sizeId, colorId);
  
      // Trả về kết quả dưới dạng JSON
      res.status(200).json({ success: true, totalversion: totalQuantity });
    } catch (error) {
      // Xử lý lỗi nếu cần thiết
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }

};

module.exports = productController;
