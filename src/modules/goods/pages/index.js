import { lazy } from "react";

const Material = lazy(() => import("./Material"));

const MaterialGroup = lazy(() => import("./MaterialGroup"));

const MaterialType = lazy(() => import("./MaterialType"));

const MaterialSuggest = lazy(() => import("./MaterialSuggest"));

const MaterialIndustryList = lazy(() => import("./MaterialIndustryList"));

export {
  Material,
  MaterialGroup,
  MaterialType,
  MaterialSuggest,
  MaterialIndustryList,
};
