'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Promotion.init({
    promotionname: DataTypes.STRING,
    code: DataTypes.STRING,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    discountValue: DataTypes.STRING,
    applicableProducts: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Promotion',
  });
  return Promotion;
};