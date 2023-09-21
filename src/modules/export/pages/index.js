import { lazy } from "react";

const ExportList = lazy(() => import("./List"));
const ExportCreate = lazy(() => import("./Create"));
const ExportUpdate = lazy(() => import("./Update"));
const ExportPrint = lazy(() => import("./Print"));

export { ExportList, ExportCreate, ExportUpdate, ExportPrint };
