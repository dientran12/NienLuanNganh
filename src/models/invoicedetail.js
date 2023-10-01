const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class InvoiceDetails extends Model {
    static associate(models) {
      // Mối quan hệ một-một với Invoices
      InvoiceDetails.belongsTo(models.Invoices, {
        foreignKey: 'invoiceId',
      });

      // Mối quan hệ nhiều-một với Products thông qua ProductDetails
      InvoiceDetails.belongsTo(models.Products, {
        through: 'ProductDetails',
        foreignKey: 'productId',
      });
    }
  }

  InvoiceDetails.init(
    {
      // Các trường và kiểu dữ liệu của InvoiceDetails
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      name: DataTypes.STRING,
      // Khóa ngoại tham chiếu đến Invoices
      invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Invoices',
          key: 'id', // Trường khóa chính của Invoices
        },
      },
    },
    {
      sequelize,
      modelName: 'InvoiceDetails', // Tên của Model, phải trùng với tên đã đặt trong Sequelize
    }
  );

  return InvoiceDetails;
};
