import { map } from "src/utils/axios";

import { GOOD } from "./_constants";

export const getAll = async (params) =>
	await map(({ data }) => data).get(GOOD.getAll, { params });
