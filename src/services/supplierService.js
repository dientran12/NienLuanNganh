const db = require('../models'); 
const Supplier = db.Supplier;

export const createSupplier = async (name, phone, address) => {
  try {
    const newSupplier = await Supplier.create({ name, phone, address });
    return { success: true, message: 'Nhà cung cấp đã được tạo', supplier: newSupplier };
  } catch (error) {
    console.error('Lỗi trong createSupplier service:', error);
    return { success: false, message: 'Lỗi máy chủ nội bộ' };
  }
};



export const deleteSupplier = async (id) => {
  try {
    // Tìm nhà cung cấp theo ID
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return { success: false, message: 'Nhà cung cấp không tồn tại' };
    }

    // Xóa nhà cung cấp
    await supplier.destroy();

    return { success: true, message: 'Nhà cung cấp đã được xóa' };
  } catch (error) {
    console.error('Lỗi trong deleteSupplier service:', error);
    return { success: false, message: 'Lỗi máy chủ nội bộ' };
  }
};





export const updateSupplier = async (supplierId, name, phone, address) => {
  try {
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      return { success: false, message: 'Nhà cung cấp không tồn tại' };
    }

    supplier.name = name;
    supplier.phone = phone;
    supplier.address = address;

    await supplier.save();

    return { success: true, message: 'Thông tin nhà cung cấp đã được cập nhật' };
  } catch (error) {
    console.error('Lỗi trong updateSupplier service:', error);
    return { success: false, message: 'Lỗi máy chủ nội bộ' };
  }
};

