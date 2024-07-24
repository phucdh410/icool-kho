//#region Imports
import { Profile as MProfile } from "_modules/auth/pages";
import {
  ExportCreate,
  ExportList,
  ExportPrint,
  ExportUpdate,
} from "_modules/export/pages";
import {
  Material as MaterialComponent,
  MaterialGroup,
  MaterialIndustryList,
  MaterialSuggest,
  MaterialType,
} from "_modules/goods/pages";
import {
  CreateDanhMucHangHoa,
  DeXuatGiaMatHang,
  DeXuatMatHang,
  DieuChinhGiaHangHoa,
  MatHang,
  NganhHangHoa,
  NhomHangHoa,
  UpdateDanhMucHangHoa,
} from "_modules/hang_hoa/pages";
import {
  ImportCreate,
  ImportList,
  ImportPrint,
  ImportUpdate,
} from "_modules/import/pages";
import {
  InventoryAdjustmentList,
  InventoryCancelCreate,
  InventoryCancelList,
  InventoryCancelUpdate,
  InventoryCheck,
  InventoryCheckCreate,
  InventoryCheckUpdate,
  InventoryInstant,
  InventoryReturnCreate,
  InventoryReturnList,
  InventoryReturnUpdate,
  InventorySlip,
} from "_modules/inventory/pages";
import DanhSachMenuPage from "_modules/menu/pages/DanhSachMenuPage";
import SuaMenuPage from "_modules/menu/pages/SuaMenuPage";
import TaoMenuPage from "_modules/menu/pages/TaoMenuPage";
import DanhSachDeXuatNhaCungCap from "_modules/nha_cung_cap/pages/DanhSachDeXuatNhaCungCap";
import SuaDeXuatNhaCungCap from "_modules/nha_cung_cap/pages/SuaDeXuatNhaCungCap";
import ThemDeXuatNhaCungCap from "_modules/nha_cung_cap/pages/ThemDeXuatNhaCungCap";
import {
  ConfigurationPermission,
  GroupPermission,
  SlipPermission,
} from "_modules/permission/pages";
import {
  PurchaseProposalFormCreate,
  PurchaseProposalFormList,
  PurchaseProposalFormPrint,
  PurchaseProposalFormUpdate,
  QuantitativeListPage,
  TransferCreatePage,
  TransferListPage,
  TransferUpdatePage,
} from "_modules/purchase_proposal_form/pages";
import {
  CancellationDetailSummary,
  CancellationSummary,
  ExportDetailSummary,
  ExportSummary,
  ImportDetailSummary,
  ImportSummary,
  InventoryAdjustmentSummary,
  InventorySummary,
  OrderSummary,
} from "_modules/summary/pages";

import {
  Export,
  HangHoa,
  Import,
  Inventory,
  Material,
  Menu,
  NhaCungCap,
  Permission,
  Profile,
  Solution,
  Summary,
} from "./constant";

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

  //#region Nhà cung cấp
  {
    ...NhaCungCap.DanhSachDeXuatNhaCungCap,
    exact: true,
    component: DanhSachDeXuatNhaCungCap,
  },
  {
    ...NhaCungCap.ThemDeXuatNhaCungCap,
    exact: true,
    component: ThemDeXuatNhaCungCap,
  },
  {
    ...NhaCungCap.SuaDeXuatNhaCungCap,
    exact: true,
    component: SuaDeXuatNhaCungCap,
  },
  //#endregion
];

export default routes;
//#endregion
