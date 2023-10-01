const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Supplier = sequelize.define('Supplier', {
    supplierName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
  });

  Supplier.associate = (models) => {
    Supplier.hasMany(models.Invoice, {
      foreignKey: 'supplierId',
      onDelete: 'CASCADE',
    });
  };

  return Supplier;
};
