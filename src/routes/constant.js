import {
  CENTRAL_KITCHEN,
  CENTRAL_WAREHOUSE,
  ENTITY_GROUP_CODE,
  SUMMARY_GROUP_CODE,
  PERMISSION_VALUE,
} from "src/configs/constant";

import { NAME as EXPORT_REDUCER } from "src/modules/export/reducers/export";
import { NAME as EXPORT_PRINT_REDUCER } from "src/modules/export/reducers/export-print";

import { NAME as IMPORT_REDUCER } from "src/modules/import/reducers/import";
import { NAME as IMPORT_PRINT_REDUCER } from "src/modules/import/reducers/import-print";

import { NAME as INVENTORY_ADJUSTMENT_REDUCER } from "src/modules/inventory/reducers/inventory-adjustment";
import { NAME as INVENTORY_CHECK_REDUCER } from "src/modules/inventory/reducers/inventory-check";
import { NAME as INVENTORY_SLIP_REDUCER } from "src/modules/inventory/reducers/inventory-slip";
import { NAME as INVENTORY_CANCEL_REDUCER } from "src/modules/inventory/reducers/inventory-cancel";
import { NAME as INVENTORY_SLIP_INSTANT_REDUCER } from "src/modules/inventory/reducers/inventory-slip-instant";

import { NAME as PURCHASE_PROPOSAL_FORM_REDUCER } from "src/modules/purchase_proposal_form/reducers/purchase-proposal-form";
import { NAME as PURCHASE_PROPOSAL_FORM_PRINT_REDUCER } from "src/modules/purchase_proposal_form/reducers/purchase-proposal-form-print";

import { NAME as SUMMARY_EXPORT_REDUCER } from "src/modules/summary/reducers/export";
import { NAME as SUMMARY_EXPORT_DETAIL_REDUCER } from "src/modules/summary/reducers/export-detail";
import { NAME as SUMMARY_IMPORT_REDUCER } from "src/modules/summary/reducers/import";
import { NAME as SUMMARY_IMPORT_DETAIL_REDUCER } from "src/modules/summary/reducers/import-detail";
import { NAME as SUMMARY_CANCELLATION_REDUCER } from "src/modules/summary/reducers/cancellation";
import { NAME as SUMMARY_CANCELLATION_DETAIL_REDUCER } from "src/modules/summary/reducers/cancellation-detail";
import { NAME as SUMMARY_INVENTORY_REDUCER } from "src/modules/summary/reducers/inventory";
import { NAME as SUMMARY_INVENTORY_ADJUSTMENT_REDUCER } from "src/modules/summary/reducers/inventory-adjustment";
import { NAME as SUMMARY_ORDER_REDUCER } from "src/modules/summary/reducers/order";

export const Default = {
  _: {
    required: {
      code: ENTITY_GROUP_CODE.ALL,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Dashboard",
    path: "/",
  },
};

export const Profile = {
  _: {
    required: {
      code: ENTITY_GROUP_CODE.ALL,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Thông tin cá nhân",
    path: "/profile",
  },
};

//#region Báo cáo
export const Summary = {
  Order: {
    required: {
      code: SUMMARY_GROUP_CODE.ALL,
      permission: PERMISSION_VALUE.READ,
    },
    reducer: SUMMARY_ORDER_REDUCER,
    icon: "",
    name: "Tổng Hợp Đặt Hàng",
    path: "/summary/order",
  },
  Import: {
    required: {
      code: SUMMARY_GROUP_CODE.ALL,
      permission: PERMISSION_VALUE.READ,
    },
    reducer: SUMMARY_IMPORT_REDUCER,
    icon: "",
    name: "Tổng Hợp Nhập Hàng",
    path: "/summary/import",
  },
  ImportDetail: {
    required: {
      code: SUMMARY_GROUP_CODE.ALL,
      permission: PERMISSION_VALUE.READ,
    },
    reducer: SUMMARY_IMPORT_DETAIL_REDUCER,
    icon: "",
    name: "Chi Tiết Nhập Hàng",
    path: "/summary/import-detail",
  },
  Export: {
    required: {
      code: SUMMARY_GROUP_CODE.ALL,
      permission: PERMISSION_VALUE.READ,
    },
    reducer: SUMMARY_EXPORT_REDUCER,
    icon: "",
    name: "Tổng Hợp Xuất Hàng",
    path: "/summary/export",
  },
  ExportDetail: {
    required: {
      code: SUMMARY_GROUP_CODE.ALL,
      permission: PERMISSION_VALUE.READ,
    },
    reducer: SUMMARY_EXPORT_DETAIL_REDUCER,
    icon: "",
    name: "Chi Tiết Xuất Hàng",
    path: "/summary/export-detail",
  },
  Cancellation: {
    required: {
      code: SUMMARY_GROUP_CODE.ALL,
      permission: PERMISSION_VALUE.READ,
    },
    reducer: SUMMARY_CANCELLATION_REDUCER,
    icon: "",
    name: "Tổng Hợp Hủy Hàng",
    path: "/summary/cancellation",
  },
  CancellationDetail: {
    required: {
      code: SUMMARY_GROUP_CODE.ALL,
      permission: PERMISSION_VALUE.READ,
    },
    reducer: SUMMARY_CANCELLATION_DETAIL_REDUCER,
    icon: "",
    name: "Chi Tiết Hủy Hàng",
    path: "/summary/cancellation-detail",
  },
  Inventory: {
    required: {
      code: SUMMARY_GROUP_CODE.ALL,
      permission: PERMISSION_VALUE.READ,
    },
    reducer: SUMMARY_INVENTORY_REDUCER,
    icon: "",
    name: "Tổng Hợp Kiểm Kho",
    path: "/summary/inventory",
  },
  InventoryAdjustment: {
    required: {
      code: SUMMARY_GROUP_CODE.ALL,
      permission: PERMISSION_VALUE.READ,
    },
    reducer: SUMMARY_INVENTORY_ADJUSTMENT_REDUCER,
    icon: "",
    name: "Điều chỉnh lượng tồn kho",
    path: "/summary/inventory-adjustment",
  },
};
//#endregion

//#region Tồn kho
export const Inventory = {
  Check: {
    List: {
      required: {
        code: ENTITY_GROUP_CODE.INVENTORY_SLIP,
        permission: PERMISSION_VALUE.READ,
      },
      reducer: INVENTORY_CHECK_REDUCER,
      icon: "",
      name: "DS kiểm kho",
      path: "/inventory-check/list",
    },
    Create: {
      required: {
        code: ENTITY_GROUP_CODE.INVENTORY_SLIP,
        permission: PERMISSION_VALUE.CREATE,
      },
      icon: "",
      name: "Tạo phiếu kiểm kho",
      path: "/inventory-check/form",
    },
    Update: {
      required: {
        code: ENTITY_GROUP_CODE.INVENTORY_SLIP,
        permission: PERMISSION_VALUE.UPDATE,
      },
      icon: "",
      name: "Sửa phiếu kiểm kho",
      path: "/inventory-check/form/:code",
    },
  },
  Slip: {
    List: {
      required: {
        code: ENTITY_GROUP_CODE.BACKLOG_SLIP,
        permission: PERMISSION_VALUE.READ,
      },
      reducer: INVENTORY_SLIP_REDUCER,
      icon: "",
      name: "DS tồn kho",
      path: "/inventory-slip/list",
    },
    Instant: {
      required: {
        code: ENTITY_GROUP_CODE.BACKLOG_SLIP,
        permission: PERMISSION_VALUE.READ,
      },
      reducer: INVENTORY_SLIP_INSTANT_REDUCER,
      icon: "",
      name: "DS tồn kho tức thời",
      path: "/inventory-slip/instant",
    },
  },
  Adjustment: {
    List: {
      required: {
        code: ENTITY_GROUP_CODE.INVENTORY_SLIP,
        permission: PERMISSION_VALUE.READ,
      },
      reducer: INVENTORY_ADJUSTMENT_REDUCER,
      icon: "",
      name: "Điều chỉnh lượng tồn kho",
      path: "/inventory-adjustment/list",
    },
  },
  Return: {
    List: {
      required: {
        code: ENTITY_GROUP_CODE.RETURN_SLIP,
        permission: PERMISSION_VALUE.READ,
      },
      icon: "",
      name: "DS phiếu trả hàng",
      path: "/inventory-return/list",
    },
    Create: {
      required: {
        code: ENTITY_GROUP_CODE.RETURN_SLIP,
        permission: PERMISSION_VALUE.CREATE,
      },
      icon: "",
      name: "Tạo phiếu trả hàng",
      path: "/inventory-return/form",
    },
    Update: {
      required: {
        code: ENTITY_GROUP_CODE.RETURN_SLIP,
        permission: PERMISSION_VALUE.UPDATE,
      },
      icon: "",
      name: "Sửa phiếu trả hàng",
      path: "/inventory-return/form/:code",
    },
  },
  Cancel: {
    List: {
      required: {
        code: ENTITY_GROUP_CODE.CANCEL_SLIP,
        permission: PERMISSION_VALUE.READ,
      },
      reducer: INVENTORY_CANCEL_REDUCER,
      icon: "",
      name: "DS phiếu hủy hàng",
      path: "/inventory-cancel/list",
    },
    Create: {
      required: {
        code: ENTITY_GROUP_CODE.CANCEL_SLIP,
        permission: PERMISSION_VALUE.CREATE,
      },
      icon: "",
      name: "Tạo phiếu hủy hàng",
      path: "/inventory-cancel/form",
    },
    Update: {
      required: {
        code: ENTITY_GROUP_CODE.CANCEL_SLIP,
        permission: PERMISSION_VALUE.UPDATE,
      },
      icon: "",
      name: "Sửa phiếu hủy hàng",
      path: "/inventory-cancel/form/:code",
    },
  },
};
//#endregion

//#region Phiếu đề xuất
export const Solution = {
  Quantitative: {
    required: {
      code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
      permission: PERMISSION_VALUE.READ,
    },
    reducer: PURCHASE_PROPOSAL_FORM_REDUCER,
    icon: "",
    name: "DS phiếu cập nhật định lượng",
    path: "/solution/quantitative-list",
  },
  List: {
    required: {
      code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
      permission: PERMISSION_VALUE.READ,
    },
    reducer: PURCHASE_PROPOSAL_FORM_REDUCER,
    icon: "",
    name: "DS phiếu đề xuất",
    path: "/solution/list",
  },
  Create: {
    required: {
      code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
      permission: PERMISSION_VALUE.CREATE,
    },
    icon: "",
    name: "Tạo phiếu đề xuất",
    path: "/solution/form",
  },
  Update: {
    required: {
      code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
      permission: PERMISSION_VALUE.UPDATE,
    },
    icon: "",
    name: "Sửa phiếu đề xuất",
    path: "/solution/form/:code",
  },
  Print: {
    required: {
      code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
      permission: PERMISSION_VALUE.READ,
    },
    reducer: PURCHASE_PROPOSAL_FORM_PRINT_REDUCER,
    icon: "",
    name: "In phiếu đề xuất",
    path: "/solution/print",
  },
  Transfer: {
    required: {
      code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "DS Phiếu Luân Chuyển",
    path: "/solution/transfer/list",
  },
  TransferCreate: {
    required: {
      code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
      permission: PERMISSION_VALUE.CREATE,
    },
    icon: "",
    name: "Tạo Phiếu luân chuyển",
    path: "/solution/transfer/form",
  },
  TransferUpdate: {
    required: {
      code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
      permission: PERMISSION_VALUE.CREATE,
    },
    icon: "",
    name: "Sửa Phiếu luân chuyển",
    path: "/solution/transfer/form/:id",
  },
};
//#endregion

//#region Xuất hàng
export const Export = {
  List: {
    required: {
      code: ENTITY_GROUP_CODE.EXPORT_SLIP,
      permission: PERMISSION_VALUE.READ,
      // store: [CENTRAL_WAREHOUSE, CENTRAL_KITCHEN],
    },
    reducer: EXPORT_REDUCER,
    icon: "",
    name: "DS phiếu xuất hàng",
    path: "/export/list",
  },
  Create: {
    required: {
      code: ENTITY_GROUP_CODE.EXPORT_SLIP,
      permission: PERMISSION_VALUE.CREATE,
      store: [CENTRAL_WAREHOUSE, CENTRAL_KITCHEN],
    },
    icon: "",
    name: "Tạo phiếu xuất hàng",
    path: "/export/form",
  },
  Update: {
    required: {
      code: ENTITY_GROUP_CODE.EXPORT_SLIP,
      permission: PERMISSION_VALUE.UPDATE,
      // store: [CENTRAL_WAREHOUSE, CENTRAL_KITCHEN],
    },
    icon: "",
    name: "Sửa phiếu xuất hàng",
    path: "/export/form/:code",
  },
  Print: {
    required: {
      code: ENTITY_GROUP_CODE.EXPORT_SLIP,
      permission: PERMISSION_VALUE.UPDATE,
      // store: [CENTRAL_WAREHOUSE, CENTRAL_KITCHEN],
    },
    reducer: EXPORT_PRINT_REDUCER,
    icon: "",
    name: "In phiếu xuất hàng",
    path: "/export/print",
  },
};
//#endregion

//#region Nhập hàng
export const Import = {
  Material: {
    List: {
      required: {
        code: ENTITY_GROUP_CODE.PURCHASE_SLIP,
        permission: PERMISSION_VALUE.READ,
      },
      reducer: IMPORT_REDUCER,
      icon: "",
      name: "DS phiếu nhập",
      path: "/import/list",
    },
    Create: {
      required: {
        code: ENTITY_GROUP_CODE.PURCHASE_SLIP,
        permission: PERMISSION_VALUE.CREATE,
      },
      icon: "",
      name: "Tạo phiếu nhập nguyên vật liệu",
      path: "/import/form",
    },
    Update: {
      required: {
        code: ENTITY_GROUP_CODE.PURCHASE_SLIP,
        permission: PERMISSION_VALUE.UPDATE,
      },
      icon: "",
      name: "Sửa phiếu nhập nguyên vật liệu",
      path: "/import/form/:code",
    },
    Print: {
      required: {
        code: ENTITY_GROUP_CODE.PURCHASE_SLIP,
        permission: PERMISSION_VALUE.READ,
      },
      reducer: IMPORT_PRINT_REDUCER,
      icon: "",
      name: "In phiếu nhập",
      path: "/import/print",
    },
  },
  Good: {
    List: {
      required: {
        code: ENTITY_GROUP_CODE.PURCHASE_SLIP,
        permission: PERMISSION_VALUE.READ,
      },
      icon: "",
      name: "DS bán thành phẩm",
      path: "/import-good/list",
    },
    Create: {
      required: {
        code: ENTITY_GROUP_CODE.PURCHASE_SLIP,
        permission: PERMISSION_VALUE.CREATE,
      },
      icon: "",
      name: "Tạo phiếu nhập bán thành phẩm",
      path: "/import-good/form",
    },
    Update: {
      required: {
        code: ENTITY_GROUP_CODE.PURCHASE_SLIP,
        permission: PERMISSION_VALUE.UPDATE,
      },
      icon: "",
      name: "Sửa phiếu nhập bán thành phẩm",
      path: "/import-good/form/:code",
    },
  },
};
//#endregion

//#region Nguyên vật liệu
export const Material = {
  List: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "DS nguyên vật liệu",
    path: "/material/list",
  },
  Category: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "DS nhóm nguyên vật liệu",
    path: "/material/category",
  },
  Industry: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "DS ngành nguyên vật liệu",
    path: "/material/industry",
  },
  Type: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "DS loại nguyên vật liệu",
    path: "/material/type",
  },
  Suggest: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "DS đề xuất nguyên vật liệu",
    path: "/material/suggest",
  },
  MatHang: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Mặt hàng",
    path: "/material/items/list",
  },
  CreateDanhMucHangHoa: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Danh mục hàng hóa",
    path: "/material/items/form",
  },
  DeXuatGiaMatHang: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Đề xuất giá",
    path: "/material/items/price-suggest",
  },
};
//#endregion

//#region Hàng hóa
export const HangHoa = {
  Industry: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "DS ngành hàng hóa",
    path: "/goods/industries",
  },
  Group: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "DS nhóm hàng hóa",
    path: "/goods/groups",
  },
  DeXuatMatHang: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "DS đề xuất hàng hóa",
    path: "/goods/suggest-list",
  },
  MatHang: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "DS mặt hàng",
    path: "/goods/list",
  },
  CreateDanhMucHangHoa: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Tạo đề xuất hàng hóa",
    path: "/goods/form",
  },
  UpdateDanhMucHangHoa: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Sửa đề xuất hàng hóa",
    path: "/goods/form/:code",
  },
  DeXuatGiaHangHoa: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Đề xuất giá",
    path: "/goods/price-suggest/:code",
  },
  DieuChinhGiaHangHoa: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Điều chỉnh giá",
    path: "/goods/price-update/:code",
  },
};
//#endregion

//#region Menu
export const Menu = {
  DanhSachMenu: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Danh sách menu",
    path: "/menus/list",
  },
  TaoMenu: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Tạo menu",
    path: "/menus/form",
  },
  SuaMenu: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Sửa menu",
    path: "/menus/form/:id",
  },
};
//#endregion

//#region Phân quyền
export const Permission = {
  User: {
    required: {
      code: ENTITY_GROUP_CODE.CONFIGURATION,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Người dùng",
    path: "/permission/user",
  },
  Group: {
    required: {
      code: ENTITY_GROUP_CODE.CONFIGURATION,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Nhóm người dùng",
    path: "/permission/group",
  },
  Slip: {
    required: {
      code: ENTITY_GROUP_CODE.CONFIGURATION,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Danh sách phiếu",
    path: "/permission/slip",
  },
  Configuration: {
    required: {
      code: ENTITY_GROUP_CODE.CONFIGURATION,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Cấu hình",
    path: "/permission/configuration",
  },
};
//#endregion

//#region Nhà cung cấp
export const NhaCungCap = {
  DanhSachDeXuatNhaCungCap: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Danh sách đề xuất nhà cung cấp",
    path: "/supplier-suggest/list",
  },
  ThemDeXuatNhaCungCap: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Thêm đề xuất nhà cung cấp",
    path: "/supplier-suggest/create",
  },
  SuaDeXuatNhaCungCap: {
    required: {
      code: ENTITY_GROUP_CODE.MATERIAL_GROUP,
      permission: PERMISSION_VALUE.READ,
    },
    icon: "",
    name: "Sửa đề xuất nhà cung cấp",
    path: "/supplier-suggest/edit/:id",
  },
};
//#endregion
