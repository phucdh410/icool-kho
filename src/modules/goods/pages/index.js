import { lazy } from "react";

const Material = lazy(() => import("./Material"));

const MaterialGroup = lazy(() => import("./MaterialGroup"));

export { Material, MaterialGroup };
