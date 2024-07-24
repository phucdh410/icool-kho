import { lazy } from "react";

const NganhHangHoa = lazy(() => import("./NganhHangHoa"));

const NhomHangHoa = lazy(() => import("./NhomHangHoa"));

const MatHang = lazy(() => import("./MatHang"));

const DeXuatMatHang = lazy(() => import("./DeXuatMatHang"));

const CreateDanhMucHangHoa = lazy(() => import("./CreateDanhMucHangHoa"));

const UpdateDanhMucHangHoa = lazy(() => import("./UpdateDanhMucHangHoa"));

const DeXuatGiaMatHang = lazy(() => import("./DeXuatGiaMatHang"));

const DieuChinhGiaHangHoa = lazy(() => import("./DieuChinhGiaHangHoa"));

export {
  CreateDanhMucHangHoa,
  DeXuatGiaMatHang,
  DeXuatMatHang,
  DieuChinhGiaHangHoa,
  MatHang,
  NganhHangHoa,
  NhomHangHoa,
  UpdateDanhMucHangHoa,
};
