import { lazy } from "react";

const GroupPermission = lazy(() => import("./Group"));

const SlipPermission = lazy(() => import("./Slip"));

const ConfigurationPermission = lazy(() => import("./Configuration"));

export { GroupPermission, SlipPermission, ConfigurationPermission };
