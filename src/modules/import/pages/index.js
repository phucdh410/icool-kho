import { lazy } from "react";

const ImportList = lazy(() => import("./List"));
const ImportCreate = lazy(() => import("./Create"));
const ImportPrint = lazy(() => import("./Print"));
const ImportUpdate = lazy(() => import("./Update"));

export { ImportList, ImportCreate, ImportUpdate, ImportPrint };
