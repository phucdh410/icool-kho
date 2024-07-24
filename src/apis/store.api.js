import { map } from "src/utils/axios";
import { Stores } from "src/utils/models/store.model";

import { STORE } from "./_constants";

export const getAll = async (params) =>
	await map(({ data }) => data.map((p) => new Stores(p)))
		.get(
			STORE.getMyStore,
			{ params }
		);
