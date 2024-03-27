export const PAGINATIONOPTIONS = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

export const STATUS_OPTIONS = [
  { value: "", label: "Tất cả" },
  { value: 0, label: "Chưa duyệt" },
  { value: 1, label: "Đã duyệt" },
  { value: 2, label: "Đã từ chối" },
];

export const QUANTITATIVE_STATUS_OPTIONS = [
  { value: "", label: "Tất cả" },
  { value: 0, label: "Đang cập nhật" },
  { value: 1, label: "Thành công" },
  { value: 2, label: "Không thành công" },
];

export const CANCLELLATION_OPTIONS = [
  { value: "", label: "Chờ duyệt" },
  { value: 1, label: "Duyệt" },
  { value: 2, label: "Từ chối" },
];

export const PRINT_OPTIONS = [
  { value: "A5", label: "A5" },
  { value: "A4", label: "A4" },
];

export const ENTITY_GROUP_CODE = {
  ALL: "0",
  BACKLOG_SLIP: "701",
  CANCEL_SLIP: "702",
  CONFIGURATION: "703",
  EXPORT_SLIP: "704",
  INVENTORY_SLIP: "705",
  INVENTORY_ADJUSTMENT: "706",
  MATERIAL_GROUP: "707",
  MATERIAL: "708",
  PURCHASE_PROPOSAL_FORM: "709",
  PURCHASE_SLIP: "710",
  RETURN_SLIP: "711",
  ROLE: "712",
};

export const SUMMARY_GROUP_CODE = {
  ALL: "0",
  ORDER: "801", // !Báo cáo đặt hàng
  IMPORT: "802", // !Báo cáo nhập hàng
  EXPORT: "803", // !Báo cáo xuất hàng
  CANCELLATION: "804", // !Báo cáo Hủy hàng
  INVENTORY: "805", // !Báo cáo Kiểm kho
  INVENTORY_ADJUSTMENT: "806", // !Báo cáo Diều chỉnh định lượng
  INVENTORY_CHECK: "807", // !Danh sách tồn kho
  INVENTORY_CHECK_INSTANT: "808", // !Danh sách tồn kho Tức thời
};

export const FORM_GROUP = 7;

export const SUMARY_GROUP = 8;

export const PERMISSION_VALUE = {
  READ: 1,
  CREATE: 2,
  UPDATE: 4,
  DELETE: 8,
  EXPORT: 16,
  APPROVE: 32,
};

export const CENTRAL_WAREHOUSE = "8";
export const CENTRAL_KITCHEN = "21";

export const ERROR_MESSAGE = {
  PURCHASE_SLIP: {
    REQUIRED: "Chưa nhập đủ thông tin",
  },
  PURCHASE_PROPOSAL_FORM: {
    CREATE: "Không thể tạo phiếu đề nghị mua hàng",
    UPDATE: "Không thể cập nhật phiếu đề nghị mua hàng",
  },
  INVENTORY_ADJUSTMENT: {
    CREATE: "Không thể tạo phiếu điều chỉnh định lượng",
    UPDATE: "Không thể cập nhật phiếu điều chỉnh định lượng",
    REQUIRED: "Chưa nhập đủ thông tin",
    MATERIAL_REQUIRED: "Chưa chọn Nguyên Vật Liệu",
    QUANTITY_REQUIRED: "Chưa nhập số lượng",
  },
  INVENTORY_CANCEL: {
    CREATE: "Không thể tạo phiếu hủy hàng",
    UPDATE: "Không thể cập nhật phiếu hủy hàng",
    RESPONSIBLE_REQUIRED: "Chưa chọn người chịu trách nhiệm",
  },
  INVENTORY_CHECK: {
    CREATE: "Không thể tạo phiếu kiểm kho thành công",
    UPDATE: "Không thể cập nhật phiếu kiểm kho thành công",
  },
  IMPORT: {
    CREATE: "Không thể tạo phiếu nhập hàng",
    UPDATE: "Không thể cập nhật phiếu nhập hàng",
  },
  EXPORT: {
    CREATE: "Không thể tạo phiếu xuất hàng",
    UPDATE: "Không thể cập nhật phiếu xuất hàng",
  },
  MATERIAL_GROUP: {
    REQUIRED: "Chưa nhập đủ thông tin",
  },
  NVL: {
    REQUIRED: "Chưa Nhập Nguyên Vật Liệu",
  },
  PERMISSION: {
    GROUP_REQUIRED: "Chưa nhập đủ thông tin",
    GROUP_EXIST: "Nhóm người dùng đã tồn tại",
    UPDATE: "Cập nhật phân quyền thất bại",
  },
};

export const SUCCESS_MESSAGE = {
  PURCHASE_PROPOSAL_FORM: {
    CREATE: "Tạo thành công phiếu đề nghị mua hàng",
    UPDATE: "Cập nhật thành công phiếu đề nghị mua hàng",
  },
  INVENTORY_ADJUSTMENT: {
    CREATE: "Tạo phiếu điều chỉnh định lượng thành công",
    UPDATE: "Cập nhật phiếu điều chỉnh định lượng thành công",
  },
  INVENTORY_CANCEL: {
    CREATE: "Tạo phiếu hủy hàng thành công",
    UPDATE: "Cập nhật phiếu hủy hàng thành công",
  },
  INVENTORY_CHECK: {
    CREATE: "Tạo phiếu kiểm kho thành công",
    UPDATE: "Cập nhật phiếu kiểm kho thành công",
  },
  IMPORT: {
    CREATE: "Tạo phiếu nhập hàng thành công",
    UPDATE: "Cập nhật phiếu nhập hàng thành công",
  },
  EXPORT: {
    CREATE: "Tạo phiếu xuất hàng thành công",
    UPDATE: "Cập nhật phiếu xuất hàng thành công",
  },
  PERMISSION: {
    UPDATE: "Cập nhật phân quyền thành công",
  },
};

export const GROUP_NVL_STATUS_OPTIONS = [
  { value: "", label: "Tất cả" },
  { value: 0, label: "Ẩn" },
  { value: 1, label: "Hoạt động" },
];

export const DATE_MANAGEMENT_OPTIONS = [
  { value: 0, label: "Không" },
  { value: 1, label: "Có" },
];
