const express = require('express');
const router = express.Router();
import { createPurchaseInvoiceController } from '../controller/purchaseinvoiceController';
import { createPurchaseInvoiceNewController } from '../controller/purchaseinvoiceController';
import { deletePurchaseInvoiceController } from '../controller/purchaseinvoiceController';

router.post('/create', createPurchaseInvoiceController);
router.post('/createNew', createPurchaseInvoiceNewController);
router.delete('/delete/:id', deletePurchaseInvoiceController);


module.exports = router;
