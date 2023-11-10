import { createPurchaseInvoice } from "../services/purchaseinvoiceService";
import { createPurchaseInvoiceNew } from "../services/purchaseinvoiceService";
import { deletePurchaseInvoiceById } from '../services/purchaseinvoiceService';

export const createPurchaseInvoiceController = async (req, res) => {
  const { supplierId, versionId, price, purchaseDate } = req.body;

  try {
    const purchaseInvoice = await createPurchaseInvoice(supplierId, versionId, price, purchaseDate);
    res.status(201).json(purchaseInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const createPurchaseInvoiceNewController = async (req, res) => {
//   try {
//     const data = req.body; // Lấy dữ liệu từ request body
//     const purchaseInvoice = await createPurchaseInvoiceNew(data);
//     res.status(201).json(purchaseInvoice);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// purchaseinvoiceController.js


// purchaseinvoiceController.js

export const createPurchaseInvoiceNewController = async (req, res) => {
  try {
    const data = req.body; // Lấy dữ liệu từ request body
    const purchaseInvoice = await createPurchaseInvoiceNew(data);
    res.status(201).json(purchaseInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deletePurchaseInvoiceController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deletePurchaseInvoiceById(id);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(404).json({ error: result.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




