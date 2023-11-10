const express = require('express');
const router = express.Router();
import { createSupplier } from '../controller/supplierController';
import { deleteSupplier } from '../controller/supplierController';
import { updateSupplier } from '../controller/supplierController';


router.post('/createSupplier', createSupplier);
router.delete('/deleteSupplier/:supplierId', deleteSupplier);
router.put('/updateSupplier/:supplierId', updateSupplier);

module.exports = router;