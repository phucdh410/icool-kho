import { get } from "src/utils/axios";

import { CONFIG } from "./_constants";

export const getConfigs = async () => await get(CONFIG.getConfigs);
