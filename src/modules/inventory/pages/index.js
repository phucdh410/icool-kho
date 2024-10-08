import { lazy } from "react";

// Kiểm kho
const InventoryCheck = lazy(() => import("./Check/List"));
const InventoryCheckCreate = lazy(() => import("./Check/Create"));
const InventoryCheckUpdate = lazy(() => import("./Check/Update"));

// Tồn kho
const InventorySlip = lazy(() => import("./Slip/List"));

// Tồn kho tức thời
const InventoryInstant = lazy(() => import("./Slip/Instant"));

// Điều chỉnh lượng tồn kho
const InventoryAdjustmentList = lazy(() => import("./Adjustment/List"));

// Trả hàng
const InventoryReturnList = lazy(() => import("./Return/List"));
const InventoryReturnCreate = lazy(() => import("./Return/Create"));
const InventoryReturnUpdate = lazy(() => import("./Return/Update"));

// Hủy hàng
const InventoryCancelList = lazy(() => import("./Cancel/List"));
const InventoryCancelCreate = lazy(() => import("./Cancel/Create"));
const InventoryCancelUpdate = lazy(() => import("./Cancel/Update"));

// Kiểm kho cuối tháng
const InventoryEndOfMonthCheck = lazy(() => import("./EndOfMonthCheck/List"));
const InventoryEndOfMonthCheckCreate = lazy(() =>
  import("./EndOfMonthCheck/Create")
);
const InventoryEndOfMonthCheckUpdate = lazy(() =>
  import("./EndOfMonthCheck/Update")
);

export {
  InventoryAdjustmentList,
  InventoryCancelCreate,
  InventoryCancelList,
  InventoryCancelUpdate,
  InventoryCheck,
  InventoryCheckCreate,
  InventoryCheckUpdate,
  InventoryEndOfMonthCheck,
  InventoryEndOfMonthCheckCreate,
  InventoryEndOfMonthCheckUpdate,
  InventoryInstant,
  InventoryReturnCreate,
  InventoryReturnList,
  InventoryReturnUpdate,
  InventorySlip,
};
