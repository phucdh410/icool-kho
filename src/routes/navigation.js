import {
  Solution,
  Inventory,
  Import,
  Export,
  Material,
  Permission,
  Summary,
  HangHoa,
} from "./constant";

import {
  Inventory as InventoryIcon,
  Solution as SolutionIcon,
  Export as ExportIcon,
  Import as ImportIcon,
  Material as MaterialIcon,
  Permission as PermissionIcon,
  Summary as SummaryIcon,
} from "_assets/icons";

import {
  CENTRAL_KITCHEN,
  CENTRAL_WAREHOUSE,
  ENTITY_GROUP_CODE,
  PERMISSION_VALUE,
  SUMMARY_GROUP_CODE,
} from "src/configs/constant";

const navigation = [
  //#region Báo cáo
  {
    _tag: "CSidebarNavDropdown",
    name: "Báo cáo",
    route: "/summary",
    icon: <SummaryIcon className="c-sidebar-nav-icon" />,
    required: [
      {
        code:
          SUMMARY_GROUP_CODE.ORDER ||
          SUMMARY_GROUP_CODE.IMPORT ||
          SUMMARY_GROUP_CODE.IMPORT ||
          SUMMARY_GROUP_CODE.EXPORT ||
          SUMMARY_GROUP_CODE.EXPORT ||
          SUMMARY_GROUP_CODE.CANCELLATION ||
          SUMMARY_GROUP_CODE.CANCELLATION ||
          SUMMARY_GROUP_CODE.INVENTORY ||
          SUMMARY_GROUP_CODE.INVENTORY_ADJUSTMENT,
      },
    ],
    childrens: [
      Summary.Order.path,
      Summary.Export.path,
      Summary.ExportDetail.path,
      Summary.Import.path,
      Summary.ImportDetail.path,
      Summary.Cancellation.path,
      Summary.CancellationDetail.path,
      Summary.Inventory.path,
      Summary.InventoryAdjustment.path,
    ],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: Summary.Order.name,
        to: Summary.Order.path,
        childrens: [Summary.Order.path],
        required: [{ code: SUMMARY_GROUP_CODE.ORDER }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Summary.Import.name,
        to: Summary.Import.path,
        childrens: [Summary.Import.path],
        required: [{ code: SUMMARY_GROUP_CODE.IMPORT }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Summary.ImportDetail.name,
        to: Summary.ImportDetail.path,
        childrens: [Summary.ImportDetail.path],
        required: [{ code: SUMMARY_GROUP_CODE.IMPORT }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Summary.Export.name,
        to: Summary.Export.path,
        childrens: [Summary.Export.path],
        required: [{ code: SUMMARY_GROUP_CODE.EXPORT }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Summary.ExportDetail.name,
        to: Summary.ExportDetail.path,
        childrens: [Summary.ExportDetail.path],
        required: [{ code: SUMMARY_GROUP_CODE.EXPORT }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Summary.Cancellation.name,
        to: Summary.Cancellation.path,
        childrens: [Summary.Cancellation.path],
        required: [{ code: SUMMARY_GROUP_CODE.CANCELLATION }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Summary.CancellationDetail.name,
        to: Summary.CancellationDetail.path,
        childrens: [Summary.CancellationDetail.path],
        required: [{ code: SUMMARY_GROUP_CODE.CANCELLATION }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Summary.Inventory.name,
        to: Summary.Inventory.path,
        childrens: [Summary.Inventory.path],
        required: [{ code: SUMMARY_GROUP_CODE.INVENTORY }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Summary.InventoryAdjustment.name,
        to: Summary.InventoryAdjustment.path,
        childrens: [Summary.InventoryAdjustment.path],
        required: [{ code: SUMMARY_GROUP_CODE.INVENTORY_ADJUSTMENT }],
      },
    ],
  },
  //#endregion

  //#region Tồn kho
  {
    _tag: "CSidebarNavDropdown",
    name: "Tồn kho",
    route: "/inventory",
    icon: <InventoryIcon className="c-sidebar-nav-icon" />,
    required: [
      { code: ENTITY_GROUP_CODE.INVENTORY_SLIP },
      { code: ENTITY_GROUP_CODE.BACKLOG_SLIP },
      { code: ENTITY_GROUP_CODE.BACKLOG_SLIP },
      { code: ENTITY_GROUP_CODE.INVENTORY_ADJUSTMENT },
      { code: ENTITY_GROUP_CODE.RETURN_SLIP },
      { code: ENTITY_GROUP_CODE.CANCEL_SLIP },
    ],
    childrens: [
      Inventory.Check.List.path,
      Inventory.Check.Create.path,
      Inventory.Check.Update.path,
      Inventory.Adjustment.List.path,
      Inventory.Slip.List.path,
      Inventory.Slip.Instant.path,
      Inventory.Return.List.path,
      Inventory.Return.Create.path,
      Inventory.Return.Update.path,
      Inventory.Cancel.List.path,
      Inventory.Cancel.Create.path,
      Inventory.Cancel.Update.path,
    ],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: Inventory.Check.List.name,
        to: Inventory.Check.List.path,
        childrens: [
          Inventory.Check.List.path,
          Inventory.Check.Create.path,
          Inventory.Check.Update.path,
        ],
        required: [{ code: ENTITY_GROUP_CODE.INVENTORY_SLIP }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Inventory.Slip.List.name,
        to: Inventory.Slip.List.path,
        childrens: [Inventory.Slip.List.path],
        // required: [{ code: ENTITY_GROUP_CODE.BACKLOG_SLIP }],
        required: [{ code: SUMMARY_GROUP_CODE.INVENTORY_CHECK }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Inventory.Slip.Instant.name,
        to: Inventory.Slip.Instant.path,
        childrens: [Inventory.Slip.Instant.path],
        // required: [{ code: ENTITY_GROUP_CODE.BACKLOG_SLIP }],
        required: [{ code: SUMMARY_GROUP_CODE.INVENTORY_CHECK_INSTANT }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Inventory.Adjustment.List.name,
        to: Inventory.Adjustment.List.path,
        childrens: [Inventory.Adjustment.List.path],
        required: [{ code: ENTITY_GROUP_CODE.INVENTORY_ADJUSTMENT }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Inventory.Return.List.name,
        to: Inventory.Return.List.path,
        childrens: [
          Inventory.Return.List.path,
          Inventory.Return.Create.path,
          Inventory.Return.Update.path,
        ],
        required: [{ code: ENTITY_GROUP_CODE.RETURN_SLIP }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Inventory.Cancel.List.name,
        to: Inventory.Cancel.List.path,
        childrens: [
          Inventory.Cancel.List.path,
          Inventory.Cancel.Create.path,
          Inventory.Cancel.Update.path,
        ],
        required: [{ code: ENTITY_GROUP_CODE.CANCEL_SLIP }],
      },
    ],
  },
  //#endregion

  //#region Phiếu đề xuất
  {
    _tag: "CSidebarNavDropdown",
    name: "Phiếu đề xuất",
    route: "/solution",
    icon: <SolutionIcon className="c-sidebar-nav-icon" />,
    required: [
      {
        code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
        permission: PERMISSION_VALUE.READ,
      },
      {
        code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
        permission: PERMISSION_VALUE.CREATE,
      },
      {
        code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
        permission: PERMISSION_VALUE.UPDATE,
      },
    ],
    childrens: [
      Solution.Quantitative.path,
      Solution.List.path,
      Solution.Create.path,
      Solution.Update.path,
      Solution.Print.path,
      Solution.Transfer.path,
      Solution.TransferCreate.path,
    ],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: Solution.Quantitative.name,
        to: Solution.Quantitative.path,
        childrens: [Solution.Quantitative.path],
        required: [
          {
            code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
            permission: PERMISSION_VALUE.READ,
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: Solution.List.name,
        to: Solution.List.path,
        childrens: [Solution.List.path],
        required: [
          {
            code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
            permission: PERMISSION_VALUE.READ,
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: Solution.Create.name,
        to: Solution.Create.path,
        childrens: [Solution.Create.path, Solution.Update.path],
        required: [
          {
            code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
            permission: PERMISSION_VALUE.CREATE,
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: Solution.Print.name,
        to: Solution.Print.path,
        childrens: [Solution.Print.path],
        required: [
          {
            code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
            permission: PERMISSION_VALUE.UPDATE,
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: Solution.Transfer.name,
        to: Solution.Transfer.path,
        childrens: [Solution.Transfer.path],
        required: [
          {
            code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
            permission: PERMISSION_VALUE.READ,
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: Solution.TransferCreate.name,
        to: Solution.TransferCreate.path,
        childrens: [Solution.TransferCreate.path],
        required: [
          {
            code: ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM,
            permission: PERMISSION_VALUE.READ,
          },
        ],
      },
    ],
  },
  //#endregion

  //#region Xuất hàng
  {
    _tag: "CSidebarNavDropdown",
    name: "Xuất hàng",
    route: "/export",
    icon: <ExportIcon className="c-sidebar-nav-icon" />,
    required: [
      {
        code: ENTITY_GROUP_CODE.EXPORT_SLIP,
        stores: [CENTRAL_KITCHEN, CENTRAL_WAREHOUSE],
      },
    ],
    childrens: [
      Export.List.path,
      Export.Create.path,
      Export.Update.path,
      Export.Print.path,
    ],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: Export.List.name,
        to: Export.List.path,
        childrens: [Export.List.path, Export.Create.path, Export.Update.path],
        required: [
          {
            code: ENTITY_GROUP_CODE.EXPORT_SLIP,
            stores: [CENTRAL_KITCHEN, CENTRAL_WAREHOUSE],
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: Export.Print.name,
        to: Export.Print.path,
        childrens: [Export.Print.path],
        required: [
          {
            code: ENTITY_GROUP_CODE.EXPORT_SLIP,
            stores: [CENTRAL_KITCHEN, CENTRAL_WAREHOUSE],
          },
        ],
      },
    ],
  },
  //#endregion

  //#region Nhập hàng
  {
    _tag: "CSidebarNavDropdown",
    name: "Nhập hàng",
    route: "/import",
    icon: <ImportIcon className="c-sidebar-nav-icon" />,
    required: [{ code: ENTITY_GROUP_CODE.PURCHASE_SLIP }],
    childrens: [
      Import.Material.List.path,
      Import.Material.Create.path,
      Import.Material.Update.path,
      Import.Material.Print.path,
    ],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Nguyên vật liệu",
        to: Import.Material.List.path,
        childrens: [
          Import.Material.List.path,
          Import.Material.Create.path,
          Import.Material.Update.path,
        ],
        required: [{ code: ENTITY_GROUP_CODE.PURCHASE_SLIP }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Import.Material.Print.name,
        to: Import.Material.Print.path,
        childrens: [Import.Material.Print.path],
        required: [{ code: ENTITY_GROUP_CODE.PURCHASE_SLIP }],
      },
    ],
  },
  //#endregion

  //#region Nguyên vật liệu
  {
    _tag: "CSidebarNavDropdown",
    name: "Danh Mục Nguyên Vật Liệu",
    route: "/material",
    icon: <MaterialIcon className="c-sidebar-nav-icon" />,
    required: [
      { code: ENTITY_GROUP_CODE.MATERIAL_GROUP },
      { code: ENTITY_GROUP_CODE.MATERIAL },
    ],
    childrens: [
      Material.Category.path,
      Material.List.path,
      Material.Industry.path,
      Material.Category.path,
      Material.Type.path,
      Material.Suggest.path,
    ],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: Material.Industry.name,
        to: Material.Industry.path,
        childrens: [Material.Industry.path],
        required: [{ code: ENTITY_GROUP_CODE.MATERIAL_GROUP }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Material.Category.name,
        to: Material.Category.path,
        childrens: [Material.Category.path],
        required: [{ code: ENTITY_GROUP_CODE.MATERIAL_GROUP }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Material.Type.name,
        to: Material.Type.path,
        childrens: [Material.Type.path],
        required: [{ code: ENTITY_GROUP_CODE.MATERIAL_GROUP }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Material.Suggest.name,
        to: Material.Suggest.path,
        childrens: [Material.Suggest.path],
        required: [{ code: ENTITY_GROUP_CODE.MATERIAL_GROUP }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Material.List.name,
        to: Material.List.path,
        childrens: [Material.List.path],
        required: [{ code: ENTITY_GROUP_CODE.MATERIAL }],
      },
    ],
  },
  //#endregion

  //#region Hàng hóa
  {
    _tag: "CSidebarNavDropdown",
    name: "Danh Mục Hàng Hóa",
    route: "/goods",
    icon: <MaterialIcon className="c-sidebar-nav-icon" />,
    required: [
      { code: ENTITY_GROUP_CODE.MATERIAL_GROUP },
      { code: ENTITY_GROUP_CODE.MATERIAL },
    ],
    childrens: [
      HangHoa.Industry.path,
      HangHoa.Group.path,
      HangHoa.MatHang.path,
      HangHoa.CreateDanhMucHangHoa.path,
    ],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: HangHoa.Industry.name,
        to: HangHoa.Industry.path,
        childrens: [HangHoa.Industry.path],
        required: [{ code: ENTITY_GROUP_CODE.MATERIAL_GROUP }],
      },
      {
        _tag: "CSidebarNavItem",
        name: HangHoa.Group.name,
        to: HangHoa.Group.path,
        childrens: [HangHoa.Group.path],
        required: [{ code: ENTITY_GROUP_CODE.MATERIAL_GROUP }],
      },
      {
        _tag: "CSidebarNavItem",
        name: HangHoa.MatHang.name,
        to: HangHoa.MatHang.path,
        childrens: [HangHoa.MatHang.path],
        required: [{ code: ENTITY_GROUP_CODE.MATERIAL }],
      },
      {
        _tag: "CSidebarNavItem",
        name: HangHoa.CreateDanhMucHangHoa.name,
        to: HangHoa.CreateDanhMucHangHoa.path,
        childrens: [HangHoa.CreateDanhMucHangHoa.path],
        required: [{ code: ENTITY_GROUP_CODE.MATERIAL }],
      },
    ],
  },
  //#endregion

  //#region Phân quyền
  {
    _tag: "CSidebarNavDropdown",
    name: "Phân quyển",
    route: "/permission",
    icon: <PermissionIcon className="c-sidebar-nav-icon" />,
    required: [{ code: ENTITY_GROUP_CODE.CONFIGURATION }],
    childrens: [
      Permission.Group.path,
      Permission.Slip.path,
      Permission.Configuration.path,
    ],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: Permission.Group.name,
        to: Permission.Group.path,
        childrens: [Permission.Group.path],
        required: [{ code: ENTITY_GROUP_CODE.CONFIGURATION }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Permission.Slip.name,
        to: Permission.Slip.path,
        childrens: [Permission.Slip.path],
        required: [{ code: ENTITY_GROUP_CODE.CONFIGURATION }],
      },
      {
        _tag: "CSidebarNavItem",
        name: Permission.Configuration.name,
        to: Permission.Configuration.path,
        childrens: [Permission.Configuration.path],
        required: [{ code: ENTITY_GROUP_CODE.CONFIGURATION }],
      },
    ],
  },
  //#endregion
];

export default navigation;
