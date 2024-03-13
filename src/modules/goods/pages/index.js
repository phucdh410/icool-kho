import { lazy } from "react";

const Material = lazy(() => import("./Material"));

const MaterialGroup = lazy(() => import("./MaterialGroup"));

const MaterialIndustryList = lazy(() => import("./MaterialIndustryList"));

export { Material, MaterialGroup, MaterialIndustryList };
