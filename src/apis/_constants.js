import { global } from "_configs/index";
const { api } = global;

// Xác thực
export const AUTH = {
  login: `${api}/users/login`,
  logout: `${api}/users/logout`,
  profile: `${api}/users/profile`,
};

// Config
export const CONFIGURATION = {
  getAllSlips: `${api}/configuration?tag=WAREHOUSE_SHEETS`,
  getAllExports: `${api}/configuration?tag=WAREHOUSE_CATEGORIES`,
  getMaterialGroupOf: `${api}/configuration/getMaterialGroupOf`,
  updateSlip: `${api}/configuration/update/WAREHOUSE_SHEETS`,
  updateCategories: `${api}/configuration/update/WAREHOUSE_CATEGORIES`,
  removeCategories: `${api}/configuration/delete/WAREHOUSE_CATEGORIES`,
};

export const CONFIG = {
  getConfigs: `${api}/warehouses/configs`,
};

// User
export const USER = {
  getAll: `${api}/users/search`,
  getByStore: `${api}/users/getByStore`,
};

// Cửa hàng
export const STORE = {
  getAll: `${api}/stores`,
  getMyStore: `${api}/stores/getMyStore`,
};

// Nhà Cung Cấp
export const SUPPLIER = {
  getAll: `${api}/supplier`,
};

// KHO
export const WAREHOUSE = {
  getAll: `${api}/warehouses`,
  getMyWarehouse: `${api}/warehouses/getMyWarehouse`,
};

// Phiếu đề xuất mua hàng
export const PURCHASE_PROPOSAL_FORM = {
  getAll: `${api}/purchase_proposal_forms`,

  getAllReport: `${api}/purchase_proposal_forms/getReport`,
  exportReport: `${api}/purchase_proposal_forms/exportReport`,

  getByStore: `${api}/purchase_proposal_forms/getByStore`,

  getByCode: `${api}/purchase_proposal_forms/getByCode`,
  checkUpdated: `${api}/quantitatives/checkUpdated`,
  checkSave: `${api}/quantitatives/checkUpdated/period`,

  getPreview: `${api}/purchase_proposal_forms/getPreview`,
  getForPrint: `${api}/purchase_proposal_forms/getForPrint`,

  getAutoSuggest: `${api}/purchase_proposal_forms/getMaterialsInventory`,
  correctQuantity: `${api}/quantitatives`,

  create: `${api}/purchase_proposal_forms/create`,
  update: `${api}/purchase_proposal_forms/update`,
  approve: `${api}/purchase_proposal_forms/approve`,
  confirm: `${api}/purchase_proposal_forms/confirm`,
  delete: `${api}/purchase_proposal_forms/delete`,

  quantitative: `${api}/quantification_forms`,
};

// Phiếu mua hàng or Phiếu nhập hàng
export const PURCHASE_SLIP = {
  getAll: `${api}/purchase-forms`,
  getByCode: `${api}/purchase-forms/getByCode`,
  getPreview: `${api}/purchase-forms/getPreview`,
  getForPrint: `${api}/purchase-forms/getForPrint`,
  getMaterial: `${api}/purchase-forms/getMaterial`,

  getReport: `${api}/purchase-forms/getReportByMaterialId`,
  exportReport: `${api}/purchase-forms/exportReportByMaterialId`,

  getAllReportDetail: `${api}/purchase-forms/getReportDetailByMaterialId`,
  exportReportDetail: `${api}/purchase-forms/exportReportDetailByMaterialId`,

  create: `${api}/purchase-forms/create`,
  update: `${api}/purchase-forms/update`,
  approve: `${api}/purchase-forms/approve`,
  delete: `${api}/purchase-forms/delete`,
};

// Phiếu hủy hàng
export const CANCELLATION_SLIP = {
  getAll: `${api}/cancellation_slips`,

  getAllReport: `${api}/cancellation_slips/getReport`,
  exportReport: `${api}/cancellation_slips/exportReport`,

  getDetailReport: `${api}/cancellation_slips/getReportDetail`,
  exportDetailReport: `${api}/cancellation_slips/exportReportDetail`,

  getByCode: `${api}/cancellation_slips/getByCode`,
  getPreview: `${api}/cancellation_slips/getPreview`,
  getResponsible: `${api}/cancellation_slips/responsible`,
  export: `${api}/cancellation_slips/export`,
  create: `${api}/cancellation_slips/create`,
  update: `${api}/cancellation_slips/update`,
  approve: `${api}/cancellation_slips/approve`,
  delete: `${api}/cancellation_slips/delete`,
};

// Phiếu kiểm kê || Phiếu kiểm kho
export const INVENTORY_SLIP = {
  getAll: `${api}/inventory-check`,

  getAllReport: `${api}/inventory-check/getReport`,
  exportReport: `${api}/inventory-check/exportReport`,

  getByWarehouse: `${api}/inventory-check/warehouse`,

  getMaterial: `${api}/inventory-check/getMaterial`,

  getByCode: `${api}/inventory-check/getByCode`,
  getPreview: `${api}/inventory-check/getPreview`,
  create: `${api}/inventory-check/create`,
  update: `${api}/inventory-check/update`,
  approve: `${api}/inventory-check/approve`,
  delete: `${api}/inventory-check/delete`,

  getUnFulfilled: `${api}/inventory-check/getUnFulfilled`,
};

// Phiểu trả hàng
export const RETURN_SLIP = {
  getAll: `${api}/returns_slips`,
  getByCode: `${api}/returns_slips/getByCode`,
  getPreview: `${api}/returns_slips/getPreview`,
  create: `${api}/returns_slips/create`,
  export: `${api}/returns_slips/export`,
  update: `${api}/returns_slips/update`,
  delete: `${api}/returns_slips/delete`,
};

// Phiếu tồn đọng
export const BACKLOG_SLIP = {
  getAll: `${api}/backlog-forms`,
  getByStoreAndDate: `${api}/backlog-forms/getByDateAndStoreCode`,
  getByWareCodeAndDate: `${api}/backlog-forms/getByWareCodeAndDate`,
  export: `${api}/backlog-forms/export`,
  exportByWareCodeAndDate: `${api}/backlog-forms/exportByWareCodeAndDate`,
  create: `${api}/backlog-forms/create`,
  update: `${api}/backlog-forms/update`,
  delete: `${api}/backlog-forms/delete`,
};

// Phiếu xuất hàng
export const EXPORT_SLIP = {
  getAll: `${api}/delivery-forms`,

  getMaterial: `${api}/delivery-forms/getMaterial`,

  getReport: `${api}/delivery-forms/getReportByMaterialId`,
  exportReport: `${api}/delivery-forms/exportReportByMaterialId`,

  getAllReportDetail: `${api}/delivery-forms/getReportDetailByMaterialId`,
  exportReportDetail: `${api}/delivery-forms/exportReportDetailByMaterialId`,

  getByCode: `${api}/delivery-forms/getByCode`,
  getPreview: `${api}/delivery-forms/getPreview`,
  getForPrint: `${api}/delivery-forms/getForPrint`,
  getByStore: `${api}/delivery-forms/getByStore`,
  create: `${api}/delivery-forms/create`,
  update: `${api}/delivery-forms/update`,
  approve: `${api}/delivery-forms/approve`,
  delete: `${api}/delivery-forms/delete`,
};

// Phiếu điều chỉnh lượng tồn kho
export const INVENTORY_ADJUSTMENT = {
  getAll: `${api}/inventory_adjustments`,

  getReport: `${api}/inventory_adjustments/getReport`,
  exportReport: `${api}/inventory_adjustments/exportReport`,

  getByCode: `${api}/inventory_adjustments/getByCode`,
  getMaterials: `${api}/inventory_adjustments/getMaterials`,
  create: `${api}/inventory_adjustments/create`,
  update: `${api}/inventory_adjustments/update`,
  delete: `${api}/inventory_adjustments/delete`,
};

// Hàng hóa
export const GOOD = {
  getAll: `${api}/goods`,
};

// Ngành Nguyên Vật liệu
export const MATERIAL_INDUSTRY = {
  getAll: `${api}/industries`,
  getByCode: `${api}/industries/getByCode`,
  search: `${api}/industries/search`,
  create: `${api}/industries/create`,
  update: `${api}/industries/updateById`,
  delete: `${api}/industries/deleteById`,
  exportExcel: `${api}/industries/export`,
};

// Nhóm Nguyên Vật liệu
export const MATERIAL_GROUP = {
  getAll: `${api}/material_groups/search`,
  getForRole: `${api}/material_groups`,
  getByCode: `${api}/material_groups/getByCode`,
  search: `${api}/material_groups/search`,
  create: `${api}/material_groups/create`,
  update: `${api}/material_groups/update`,
  delete: `${api}/material_groups/delete`,
  exportExcel: `${api}/material_groups/export`,
};

// Loại Nguyên Vật liệu
export const MATERIAL_TYPE = {
  getAll: `${api}/material_types`,
  create: `${api}/material_types/create`,
  update: `${api}/material_types/update`,
  delete: `${api}/material_types/delete`,
  exportExcel: `${api}/material_types/export`,
};

// Loại Nguyên Vật liệu
export const MATERIAL_SUGGEST = {
  getAll: `${api}/material_suggestion`,
  create: `${api}/material_suggestion/create`,
  update: `${api}/material_suggestion/update`,
  getByCode: `${api}/material_suggestion/getByCode`,
  delete: `${api}/material_suggestion/delete`,
  exportExcel: `${api}/material_suggestion/export`,
  createSuggest: `${api}/material_suggestion/price_suggestions/create`,
  deleteSuggest: `${api}/material_suggestion/price_suggestions/delete`,
  confirm: `${api}/material_suggestion/price_suggestions/confirm`,
  approve: `${api}/material_suggestion/approval`,
};

// Nguyên vật liệu
export const MATERIAL = {
  getAll: `${api}/materials`,
  getAllByUser: `${api}/materials/my-materials`,
  getByCode: `${api}/materials/getByCode`,
  getByGroupCode: `${api}/materials/getByMaterialGroupCode`,
  create: `${api}/materials/create`,
  update: `${api}/materials/update`,
  delete: `${api}/materials/delete`,
  getTransferMaterials: `${api}/materials/transfer-forms`,
  createTransfer: `${api}/transfer-forms/create`,
  updateTransfer: `${api}/transfer-forms/update`,
  getTransferById: `${api}/transfer-forms/getById`,
  getAllTransfers: `${api}/transfer-forms`,
  deleteTransfer: `${api}/transfer-forms/delete`,
  confirmTransfer: `${api}/transfer-forms/confirm`,
};

export const ROLE = {
  getAll: `${api}/roles`,
  getByCode: `${api}/roles/getByCode`,
  getUserByRole: `${api}/roles/getUserByRole`,
  getPermissionByRole: `${api}/permission/getByPermissionByRole`,
  getMaterialGroupsByRole: `${api}/permission/getMaterialGroupsByRole`,
  create: `${api}/roles/create`,
  update: `${api}/roles/update`,
  delete: `${api}/roles/delete`,
};

// Phân quyền
export const PERMISSION = {
  getAllFunction: `${api}/permission`,
  update: `${api}/roles/update`,
};
