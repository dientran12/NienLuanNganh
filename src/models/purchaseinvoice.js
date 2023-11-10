  'use strict';
  const { Model } = require('sequelize');

  module.exports = (sequelize, DataTypes) => {
    class PurchaseInvoice extends Model {
      static associate(models) {
          PurchaseInvoice.belongsTo(models.Versions, { foreignKey: 'versionId' });
          PurchaseInvoice.belongsTo(models.Supplier, { foreignKey: 'supplierId' });
      }
    }

    PurchaseInvoice.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      supplierId: {
              type: DataTypes.INTEGER,
              references: {
              model: 'Supplier', 
              key: 'id',
            },
      },
      versionId: {
          type: DataTypes.INTEGER,
          references: {
          model: 'Versions', 
          key: 'id', 
        },
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      purchaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'PurchaseInvoice',
      tableName: 'PurchaseInvoices', 
    });

    return PurchaseInvoice;
  };
