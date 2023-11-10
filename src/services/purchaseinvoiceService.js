import { PurchaseInvoice, Versions, Supplier, SizeItem } from '../models';
import { Product, Color, Size } from '../models';
;


export const createPurchaseInvoice = async (supplierId, versionId, price, purchaseDate) => {
  try {

    console.log(versionId)
    // Tìm thông tin Supplier và Version dựa trên id
    const supplier = await Supplier.findByPk(supplierId);
    console.log(supplier);

    const version = await Versions.findByPk(versionId);
    console.log(version);

    if (!supplier || !version) {
      throw new Error('Supplier or Version not found');
    }

    // Tìm SizeItem dựa trên versionId (nếu có)
    const sizeitem = await SizeItem.findOne({
      where: { versionId: versionId },
    });

    // Tính toán total dựa trên price và quantity từ SizeItem hoặc 0 nếu không tìm thấy SizeItem
    const total = price * (sizeitem ? sizeitem.quantity : 0);

    // Tạo một bản ghi PurchaseInvoice với thông tin đã tìm thấy và nhập
    const purchaseInvoice = await PurchaseInvoice.create({
      supplierId: supplierId,
      versionId: versionId,
      size: sizeitem ? sizeitem.sizeId : null,
      color: version.colorId,
      quantity: sizeitem ? sizeitem.quantity : null,
      price: price, // Giá bạn tự nhập
      total: total, // Tính toán total
      purchaseDate: purchaseDate,
    });

    return purchaseInvoice;
  } catch (error) {
    throw new Error(`Failed to create Purchase Invoice: ${error.message}`);
  }
};


// export const createPurchaseInvoiceNew = async (data) => {
//   const { productName, colorName, sizeName, supplierName, quantity, price, purchaseDate } = data;

//   let supplier = await Supplier.findOrCreate({ where: { name: supplierName } });
//   const supplierId = supplier[0].id;

//   let product = await Product.findOrCreate({ where: { name: productName } });
//   const productId = product[0].id;

//   let size = await Size.findOrCreate({ where: { sizeName } });
//   const sizeId = size[0].id;

//   let color = await Color.findOrCreate({ where: { colorName } });
//   const colorId = color[0].id;

//   const version = await Versions.create({ colorId, productId });

//   const sizeItem = await SizeItem.create({ quantity, sizeId, versionId: version.id });

//   const total = price * quantity;

//   // Tạo bảng PurchaseInvoice với thông tin từ các bước trước đó
//   const purchaseInvoice = await PurchaseInvoice.create({
//     versionId: version.id,
//     supplierId: supplierId,
//     size: sizeName,
//     color: colorName,
//     quantity,
//     price, // Giá bạn nhập vào
//     total, // Tính toán total
//     purchaseDate,
//   });

//   return purchaseInvoice;
// };


export const createPurchaseInvoiceNew = async (data) => {
  const { productName, colorName, sizeName, supplierName, supplierPhone, supplierAddress, quantity, price, purchaseDate } = data;

  let supplier = await Supplier.findOrCreate({ where: { name: supplierName, phone: supplierPhone, address: supplierAddress } });
  let supplierId;
  if (supplier[1]) {
    supplierId = supplier[0].id;
    await Supplier.create({
      id: supplierId,
      name: supplierName,
      phone: supplierPhone,
      address: supplierAddress,
    });
  } else {
    supplierId = supplier[0].id;
  }

  let product = await Product.findOrCreate({ where: { name: productName } });
  const productId = product[0].id;

  let size = await Size.findOrCreate({ where: { sizeName } });
  const sizeId = size[0].id;

  let color = await Color.findOrCreate({ where: { colorName } });
  const colorId = color[0].id;

  const version = await Versions.create({ colorId, productId });

  const sizeItem = await SizeItem.create({ quantity, sizeId, versionId: version.id });

  const total = price * quantity;

  const purchaseInvoice = await PurchaseInvoice.create({
    versionId: version.id,
    supplierId: supplierId,
    size: sizeName,
    color: colorName,
    quantity,
    price, // Giá bạn nhập vào
    total, // Tính toán total
    purchaseDate,
  });
  return purchaseInvoice;
};



export const deletePurchaseInvoiceById = async (id) => {
  try {
    // Tìm purchaseInvoice dựa trên id
    const purchaseInvoice = await PurchaseInvoice.findByPk(id);

    // Nếu không tìm thấy purchaseInvoice với id tương ứng
    if (!purchaseInvoice) {
      return { success: false, message: 'Không tìm thấy purchaseInvoice với id này.' };
    }

    // Xóa purchaseInvoice
    await purchaseInvoice.destroy();

    return { success: true, message: 'Xóa purchaseInvoice thành công.' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};



