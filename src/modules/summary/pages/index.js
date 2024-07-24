import { lazy } from "react";

const CancellationSummary = lazy(() => import("./Cancellation"));
const CancellationDetailSummary = lazy(() => import("./CancellationDetail"));
const ExportSummary = lazy(() => import("./Export"));
const ExportDetailSummary = lazy(() => import("./ExportDetail"));
const ImportSummary = lazy(() => import("./Import"));
const ImportDetailSummary = lazy(() => import("./ImportDetail"));
const InventorySummary = lazy(() => import("./Inventory"));
const InventoryAdjustmentSummary = lazy(() => import("./InventoryAdjustment"));
const OrderSummary = lazy(() => import("./Order"));

export {
  CancellationDetailSummary,
  CancellationSummary,
  ExportDetailSummary,
  ExportSummary,
  ImportDetailSummary,
  ImportSummary,
  InventoryAdjustmentSummary,
  InventorySummary,
  OrderSummary,
};
