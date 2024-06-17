import { lazy } from "react";

const Material = lazy(() => import("./Material"));

const MaterialGroup = lazy(() => import("./MaterialGroup"));

const MaterialType = lazy(() => import("./MaterialType"));

const MaterialSuggest = lazy(() => import("./MaterialSuggest"));

const MaterialIndustryList = lazy(() => import("./MaterialIndustryList"));

const MatHang = lazy(() => import("./MatHang"));

const CreateDanhMucHangHoa = lazy(() => import("./CreateDanhMucHangHoa"));

const DeXuatGiaMatHang = lazy(() => import("./DeXuatGiaMatHang"));

export {
  Material,
  MaterialGroup,
  MaterialType,
  MaterialSuggest,
  MaterialIndustryList,
  MatHang,
  CreateDanhMucHangHoa,
  DeXuatGiaMatHang,
};
