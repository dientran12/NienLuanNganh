const db = require('../models/index');
const Product = db.Product;
const Color = db.Color; 

const colorService = {
      async createColor(colorData) {
        try {
          // Kiểm tra xem màu sắc có trùng tên không
          const existingColor = await Color.findOne({
            where: {
              colorName: colorData.colorName
            }
          });
    
          if (existingColor) {
            return { status: "error", message: "Color đã tồn tại" };
          } else {
            const color = await Color.create(colorData);
            return { status: "succes", message: "Color đã tạo thành công", data: color };
          }
          
        } catch (error) {
          throw new Error('Error creating color: ' + error.message);
        }
      },
      getAllColors: async () => {
        try {
          const colors = await Color.findAll();
          return colors;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
      deleteColorById: async (id) => {
        try {
          const deletedColor = await Color.destroy({
            where: { id: id }
          });
          if (deletedColor > 0) {
            return { message: 'Color deleted successfully.' };
          } else {
            return { message: 'Color not found.' };
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
      getProductsByColor: async (colorId) => {
        try {
          const color = await Color.findByPk(colorId, {
            include: [{ model: Product, through: 'ProductDetails' }]
          });
          return color ? color.Products : [];
        } catch (error) {
          console.error(error);
          return null;
        }
      },
      async getColorById(colorId) {
        try {
          const color = await Color.findByPk(colorId);
          if (color) {
            return color;
          } else {
            throw new Error('Color not found.');
          }
        } catch (error) {
          throw new Error('Error getting color: ' + error.message);
        }
      },
      async getColorByName(colorName) {
        try {
          const color = await Color.findOne({
            where: { colorName: colorName }
          });
      
          if (color) {
            return color;
          } else {
            throw new Error('Color not found.');
          }
        } catch (error) {
          throw new Error('Error getting color: ' + error.message);
        }
      },
      async updateColor(colorId, updatedColorData) {
        try {
          const color = await Color.findByPk(colorId);
          if (color) {
            await color.update(updatedColorData);
            return color;
          } else {
            throw new Error('Color not found.');
          }
        } catch (error) {
          throw new Error('Error updating color: ' + error.message);
        }
      }
};

module.exports = colorService;