import {
  Solution,
  Profile,
  Material,
  Inventory,
  Export,
  Import,
  Permission,
  Summary,
} from "./constant";

//#region Imports
import { Profile as MProfile } from "_modules/auth/pages";

import {
  MaterialGroup,
  Material as MaterialComponent,
  MaterialIndustryList,
} from "_modules/goods/pages";

import {
  QuantitativeListPage,
  PurchaseProposalFormList,
  PurchaseProposalFormCreate,
  PurchaseProposalFormUpdate,
  PurchaseProposalFormPrint,
} from "_modules/purchase_proposal_form/pages";

import {
  InventoryCheck,
  InventoryCheckCreate,
  InventoryCheckUpdate,
  InventorySlip,
  InventoryInstant,
  InventoryAdjustmentList,
  InventoryReturnList,
  InventoryReturnCreate,
  InventoryReturnUpdate,
  InventoryCancelList,
  InventoryCancelCreate,
  InventoryCancelUpdate,
} from "_modules/inventory/pages";

import {
  ExportCreate,
  ExportList,
  ExportUpdate,
  ExportPrint,
} from "_modules/export/pages";

import {
  ImportCreate,
  ImportList,
  ImportPrint,
  ImportUpdate,
} from "_modules/import/pages";

import {
  GroupPermission,
  SlipPermission,
  ConfigurationPermission,
} from "_modules/permission/pages";

import {
  CancellationSummary,
  ImportSummary,
  ImportDetailSummary,
  ExportSummary,
  ExportDetailSummary,
  InventorySummary,
  InventoryAdjustmentSummary,
  OrderSummary,
  CancellationDetailSummary,
} from "_modules/summary/pages";

//#endregion

//#region Routes
const routes = [
  // {
  // 	...Default["_"],
  // 	exact: true,
  // 	path: "/",
  // 	component: () => <>Dashboard</>,
  // },
  {
    exact: true,
    from: "/",
    redirect: Inventory.Slip.List.path,
  },
  //#region INVENTORY
  //#region CHECK || Kiểm kho
  {
    ...Inventory.Check.List,
    exact: true,
    component: InventoryCheck,
  },
  {
    ...Inventory.Check.Create,
    exact: true,
    component: InventoryCheckCreate,
  },
  {
    ...Inventory.Check.Update,
    exact: true,
    component: InventoryCheckUpdate,
  },
  //#endregion
  //#region SLIP || Danh sách tồn kho
  {
    ...Inventory.Slip.List,
    exact: true,
    component: InventorySlip,
    //#endregion
  },
  //#region || Tồn kho tức thời
  {
    ...Inventory.Slip.Instant,
    exact: true,
    component: InventoryInstant,
  },
  //#endregion

  //#region ADJUSMENT || Điều chỉnh lượng tồn kho
  {
    ...Inventory.Adjustment.List,
    exact: true,
    component: InventoryAdjustmentList,
  },
  //#endregion

  //#region RETURN || Trả hàng
  {
    ...Inventory.Return.List,
    exact: true,
    component: InventoryReturnList,
  },
  {
    ...Inventory.Return.Create,
    exact: true,
    component: InventoryReturnCreate,
  },
  {
    ...Inventory.Return.Update,
    exact: true,
    component: InventoryReturnUpdate,
  },
  //#endregion

  //#region CANCEL || Hủy hàng
  {
    ...Inventory.Cancel.List,
    exact: true,
    component: InventoryCancelList,
  },
  {
    ...Inventory.Cancel.Create,
    exact: true,
    component: InventoryCancelCreate,
  },
  {
    ...Inventory.Cancel.Update,
    exact: true,
    component: InventoryCancelUpdate,
  },
  //#endregion
  //#endregion
  //#region EXPORT
  {
    ...Export.List,
    exact: true,
    component: ExportList,
  },
  {
    ...Export.Create,
    exact: true,
    component: ExportCreate,
  },
  {
    ...Export.Update,
    exact: true,
    component: ExportUpdate,
  },
  {
    ...Export.Print,
    exact: true,
    component: ExportPrint,
  },
  //#endregion
  //#region IMPORT
  {
    ...Import.Material.List,
    exact: true,
    component: ImportList,
  },
  {
    ...Import.Material.Create,
    exact: true,
    component: ImportCreate,
  },
  {
    ...Import.Material.Update,
    exact: true,
    component: ImportUpdate,
  },

  {
    ...Import.Material.Print,
    exact: true,
    component: ImportPrint,
  },
  //#endregion
  //#region USER
  {
    ...Profile["_"],
    exact: true,
    component: MProfile,
  },
  //#endregion
  //#region PURCHASE PROPOSAL FORM
  {
    ...Solution.Quantitative,
    exact: true,
    component: QuantitativeListPage,
  },
  {
    ...Solution.List,
    exact: true,
    component: PurchaseProposalFormList,
  },
  {
    ...Solution.Create,
    exact: true,
    component: PurchaseProposalFormCreate,
  },
  {
    ...Solution.Update,
    exact: true,
    component: PurchaseProposalFormUpdate,
  },
  {
    ...Solution.Print,
    exact: true,
    component: PurchaseProposalFormPrint,
  },
  //#endregion
  //#region MATERIALS
  {
    ...Material.Industry,
    exact: true,
    component: MaterialIndustryList,
  },
  {
    ...Material.Category,
    exact: true,
    component: MaterialGroup,
  },
  {
    ...Material.List,
    exact: true,
    component: MaterialComponent,
  },
  //#endregion
  //#region PERMISSION
  {
    ...Permission.Group,
    exact: true,
    component: GroupPermission,
  },
  {
    ...Permission.Slip,
    exact: true,
    component: SlipPermission,
  },
  {
    ...Permission.Configuration,
    exact: true,
    component: ConfigurationPermission,
  },
  //#endregion
  //#region Summary
  {
    ...Summary.Export,
    exact: true,
    component: ExportSummary,
  },
  {
    ...Summary.ExportDetail,
    exact: true,
    component: ExportDetailSummary,
  },
  {
    ...Summary.Import,
    exact: true,
    component: ImportSummary,
  },
  {
    ...Summary.Cancellation,
    exact: true,
    component: CancellationSummary,
  },
  {
    ...Summary.CancellationDetail,
    exact: true,
    component: CancellationDetailSummary,
  },
  {
    ...Summary.ImportDetail,
    exact: true,
    component: ImportDetailSummary,
  },
  {
    ...Summary.Inventory,
    exact: true,
    component: InventorySummary,
  },
  {
    ...Summary.InventoryAdjustment,
    exact: true,
    component: InventoryAdjustmentSummary,
  },
  {
    ...Summary.Order,
    exact: true,
    component: OrderSummary,
  },
  //#endregion
];

export default routes;
//#endregion
