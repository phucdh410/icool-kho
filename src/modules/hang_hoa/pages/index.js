import { lazy } from "react";

const NganhHangHoa = lazy(() => import("./NganhHangHoa"));

const NhomHangHoa = lazy(() => import("./NhomHangHoa"));

const MatHang = lazy(() => import("./MatHang"));

const CreateDanhMucHangHoa = lazy(() => import("./CreateDanhMucHangHoa"));

const UpdateDanhMucHangHoa = lazy(() => import("./UpdateDanhMucHangHoa"));

const DeXuatGiaMatHang = lazy(() => import("./DeXuatGiaMatHang"));

export {
  NganhHangHoa,
  NhomHangHoa,
  MatHang,
  CreateDanhMucHangHoa,
  UpdateDanhMucHangHoa,
  DeXuatGiaMatHang,
};
