import {
  Solution,
  Profile,
  Material,
  Inventory,
  Export,
  Import,
  Permission,
  Summary,
  HangHoa,
  Menu,
} from "./constant";

//#region Imports
import { Profile as MProfile } from "_modules/auth/pages";

import {
  MaterialGroup,
  Material as MaterialComponent,
  MaterialIndustryList,
  MaterialType,
  MaterialSuggest,
} from "_modules/goods/pages";

import {
  NganhHangHoa,
  NhomHangHoa,
  MatHang,
  CreateDanhMucHangHoa,
  UpdateDanhMucHangHoa,
  DeXuatGiaMatHang,
  DeXuatMatHang,
  DieuChinhGiaHangHoa,
} from "_modules/hang_hoa/pages";

import {
  QuantitativeListPage,
  PurchaseProposalFormList,
  PurchaseProposalFormCreate,
  PurchaseProposalFormUpdate,
  PurchaseProposalFormPrint,
  TransferListPage,
  TransferCreatePage,
  TransferUpdatePage,
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

import DanhSachMenuPage from "_modules/menu/pages/DanhSachMenuPage";
import TaoMenuPage from "_modules/menu/pages/TaoMenuPage";
import SuaMenuPage from "_modules/menu/pages/SuaMenuPage";

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

  //#region Báo cáo
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

  //#region Kiểm kho
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

  //#region Danh sách tồn kho
  {
    ...Inventory.Slip.List,
    exact: true,
    component: InventorySlip,
    //#endregion
  },
  //#region Tồn kho tức thời
  {
    ...Inventory.Slip.Instant,
    exact: true,
    component: InventoryInstant,
  },
  //#endregion

  //#region Điều chỉnh lượng tồn kho
  {
    ...Inventory.Adjustment.List,
    exact: true,
    component: InventoryAdjustmentList,
  },
  //#endregion

  //#region Trả hàng
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

  //#region Hủy hàng
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

  //#region Trả hàng
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

  //#region Xuất hàng
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

  //#region Nhập hàng
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

  //#region Người dùng
  {
    ...Profile["_"],
    exact: true,
    component: MProfile,
  },
  //#endregion

  //#region Phiếu đề xuất
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
  {
    ...Solution.Transfer,
    exact: true,
    component: TransferListPage,
  },
  {
    ...Solution.TransferCreate,
    exact: true,
    component: TransferCreatePage,
  },
  {
    ...Solution.TransferUpdate,
    exact: true,
    component: TransferUpdatePage,
  },
  //#endregion

  //#region Nguyên vật liệu
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
    ...Material.Type,
    exact: true,
    component: MaterialType,
  },
  {
    ...Material.Suggest,
    exact: true,
    component: MaterialSuggest,
  },
  {
    ...Material.List,
    exact: true,
    component: MaterialComponent,
  },
  //#endregion

  //#region Hàng hóa
  {
    ...HangHoa.Industry,
    exact: true,
    component: NganhHangHoa,
  },
  {
    ...HangHoa.Group,
    exact: true,
    component: NhomHangHoa,
  },
  {
    ...HangHoa.DeXuatMatHang,
    exact: true,
    component: DeXuatMatHang,
  },
  {
    ...HangHoa.MatHang,
    exact: true,
    component: MatHang,
  },
  {
    ...HangHoa.CreateDanhMucHangHoa,
    exact: true,
    component: CreateDanhMucHangHoa,
  },
  {
    ...HangHoa.UpdateDanhMucHangHoa,
    exact: true,
    component: UpdateDanhMucHangHoa,
  },
  {
    ...HangHoa.DeXuatGiaHangHoa,
    exact: true,
    component: DeXuatGiaMatHang,
  },
  {
    ...HangHoa.DieuChinhGiaHangHoa,
    exact: true,
    component: DieuChinhGiaHangHoa,
  },
  //#endregion

  //#region Menu
  {
    ...Menu.DanhSachMenu,
    exact: true,
    component: DanhSachMenuPage,
  },
  {
    ...Menu.TaoMenu,
    exact: true,
    component: TaoMenuPage,
  },
  {
    ...Menu.SuaMenu,
    exact: true,
    component: SuaMenuPage,
  },
  //#endregion

  //#region Phân quyền
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
];

export default routes;
//#endregion
