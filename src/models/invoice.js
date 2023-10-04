// Trong file invoices.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Invoice extends Model {
    static associate(models) {
      // Mối quan hệ "một-nhiều" giữa Invoice và Suppliers
      Invoice.belongsTo(models.Supplier, {
        foreignKey: 'supplierId',
      });

      // Mối quan hệ "một-một" giữa Invoice và InvoiceDetails
      Invoice.hasOne(models.InvoiceDetails, {
        foreignKey: 'invoiceId',
      });
    }
  }

  Invoice.init(
    {
      idInvoice: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Các thuộc tính của bảng invoices
      invoiceName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      // supplierId sẽ là khóa ngoại tham chiếu đến bảng suppliers
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Invoice',
      tableName: 'invoices', // Tên của bảng trong CSDL
    }
  );

  return Invoice;
};
