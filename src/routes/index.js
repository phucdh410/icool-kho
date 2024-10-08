//#region Imports
import { Profile as MProfile } from "_modules/auth/pages";
import ComboItem from "_modules/combo/pages/ComboItem";
import DanhSachCombo from "_modules/combo/pages/DanhSachCombo";
import DanhSachDeXuatCombo from "_modules/combo/pages/DanhSachDeXuatCombo";
import SuaCombo from "_modules/combo/pages/SuaCombo";
import SuaDeXuatCombo from "_modules/combo/pages/SuaDeXuatCombo";
import ThemCombo from "_modules/combo/pages/ThemCombo";
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
  InventoryEndOfMonthCheck,
  InventoryEndOfMonthCheckCreate,
  InventoryEndOfMonthCheckUpdate,
  InventoryInstant,
  InventoryReturnCreate,
  InventoryReturnList,
  InventoryReturnUpdate,
  InventorySlip,
} from "_modules/inventory/pages";
import ChiTietMenu from "_modules/menu/pages/ChiTietMenu";
import DanhSachMenuPage from "_modules/menu/pages/DanhSachMenuPage";
import SuaMenuPage from "_modules/menu/pages/SuaMenuPage";
import TaoMenuPage from "_modules/menu/pages/TaoMenuPage";
import ChamDiemDeXuatNhaCungCap from "_modules/nha_cung_cap/pages/ChamDiemDeXuatNhaCungCap";
import DanhGiaDeXuatNhaCungCap from "_modules/nha_cung_cap/pages/DanhGiaDeXuatNhaCungCap";
import DanhSachDeXuatNhaCungCap from "_modules/nha_cung_cap/pages/DanhSachDeXuatNhaCungCap";
import SuaDeXuatNhaCungCap from "_modules/nha_cung_cap/pages/SuaDeXuatNhaCungCap";
import ThemDeXuatNhaCungCap from "_modules/nha_cung_cap/pages/ThemDeXuatNhaCungCap";
import {
  ConfigurationPermission,
  GroupPermission,
  SlipPermission,
} from "_modules/permission/pages";
import DanhSachNhaCungCapChamDiem from "_modules/phieu_cham_diem_nha_cung_cap/pages/DanhSachNhaCungCapChamDiem";
import DanhSachPhieuChamDiemNhaCungCap from "_modules/phieu_cham_diem_nha_cung_cap/pages/DanhSachPhieuChamDiemNhaCungCap";
import NhaCungCapChamDiem from "_modules/phieu_cham_diem_nha_cung_cap/pages/NhaCungCapChamDiem";
import SuaPhieuChamDiemNhaCungCap from "_modules/phieu_cham_diem_nha_cung_cap/pages/SuaPhieuChamDiemNhaCungCap";
import ThemPhieuChamDiemNhaCungCap from "_modules/phieu_cham_diem_nha_cung_cap/pages/ThemPhieuChamDiemNhaCungCap";
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
  ChatLuongHangHoa,
  Combo,
  DeXuatNhaCungCap,
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

  //#region Kiểm kho cuối tháng
  {
    ...Inventory.EndOfMonthCheck.List,
    exact: true,
    component: InventoryEndOfMonthCheck,
  },
  {
    ...Inventory.EndOfMonthCheck.Create,
    exact: true,
    component: InventoryEndOfMonthCheckCreate,
  },
  {
    ...Inventory.EndOfMonthCheck.Update,
    exact: true,
    component: InventoryEndOfMonthCheckUpdate,
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
  {
    ...Menu.ChiTietMenu,
    exact: true,
    component: ChiTietMenu,
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

  //#region Đề xuất nhà cung cấp
  {
    ...DeXuatNhaCungCap.DanhSachDeXuatNhaCungCap,
    exact: true,
    component: DanhSachDeXuatNhaCungCap,
  },
  {
    ...DeXuatNhaCungCap.ThemDeXuatNhaCungCap,
    exact: true,
    component: ThemDeXuatNhaCungCap,
  },
  {
    ...DeXuatNhaCungCap.SuaDeXuatNhaCungCap,
    exact: true,
    component: SuaDeXuatNhaCungCap,
  },
  {
    ...DeXuatNhaCungCap.DanhGiaDeXuatNhaCungCap,
    exact: true,
    component: DanhGiaDeXuatNhaCungCap,
  },
  {
    ...DeXuatNhaCungCap.ChamDiemDeXuatNhaCungCap,
    exact: true,
    component: ChamDiemDeXuatNhaCungCap,
  },
  //#endregion

  //#region Nhà cung cấp
  {
    ...NhaCungCap.DanhSachPhieuChamDiemNhaCungCap,
    exact: true,
    component: DanhSachPhieuChamDiemNhaCungCap,
  },
  {
    ...NhaCungCap.ThemPhieuChamDiemNhaCungCap,
    exact: true,
    component: ThemPhieuChamDiemNhaCungCap,
  },
  {
    ...NhaCungCap.SuaPhieuChamDiemNhaCungCap,
    exact: true,
    component: SuaPhieuChamDiemNhaCungCap,
  },
  {
    ...NhaCungCap.DanhSachNhaCungCapChamDiem,
    exact: true,
    component: DanhSachNhaCungCapChamDiem,
  },
  {
    ...NhaCungCap.ChamDiemNhaCungCap,
    exact: true,
    component: NhaCungCapChamDiem,
  },
  //#endregion

  //#region Chất lượng hàng hóa
  {
    ...ChatLuongHangHoa.DanhSachPhieuChamDiemHangHoa,
    exact: true,
    component: DanhSachPhieuChamDiemNhaCungCap,
  },
  {
    ...ChatLuongHangHoa.ThemPhieuChamDiemHangHoa,
    exact: true,
    component: ThemPhieuChamDiemNhaCungCap,
  },
  {
    ...ChatLuongHangHoa.SuaPhieuChamDiemHangHoa,
    exact: true,
    component: SuaPhieuChamDiemNhaCungCap,
  },
  {
    ...ChatLuongHangHoa.DanhSachHangHoaChamDiem,
    exact: true,
    component: DanhSachNhaCungCapChamDiem,
  },
  {
    ...ChatLuongHangHoa.ChamDiemHangHoa,
    exact: true,
    component: NhaCungCapChamDiem,
  },
  //#endregion

  //#region Combo
  {
    ...Combo.DanhMucComboItem,
    exact: true,
    component: ComboItem,
  },
  {
    ...Combo.ThemDeXuatCombo,
    exact: true,
    component: ThemCombo,
  },
  {
    ...Combo.DanhSachDeXuatCombo,
    exact: true,
    component: DanhSachDeXuatCombo,
  },
  {
    ...Combo.SuaDeXuatCombo,
    exact: true,
    component: SuaDeXuatCombo,
  },
  {
    ...Combo.DanhSachCombo,
    exact: true,
    component: DanhSachCombo,
  },
  {
    ...Combo.SuaCombo,
    exact: true,
    component: SuaCombo,
  },
  //#endregion
];

export default routes;
//#endregion
