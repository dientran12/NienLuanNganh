const db = require('../models'); // Import model
const Supplier = db.Supplier;
import * as supplierService from '../services/supplierService';



export const createSupplier = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const result = await supplierService.createSupplier(name, phone, address);

    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Lỗi trong createSupplier controller:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};


export const deleteSupplier = async (req, res) => {
  try {
    const { supplierId } = req.params; // Supplier ID cần xóa
    const result = await supplierService.deleteSupplier(supplierId);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error('Lỗi trong deleteSupplier controller:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};




export const updateSupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const { name, phone, address } = req.body;
    const result = await supplierService.updateSupplier(supplierId, name, phone, address);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error('Lỗi trong updateSupplier controller:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};

