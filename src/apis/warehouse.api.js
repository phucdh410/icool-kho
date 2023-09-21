import { map } from "src/utils/axios";

import { WAREHOUSE } from "./_constants";

import { Warehouses } from "_models/warehouse.model";

export const getAll = async (params) =>
	await map(({ data }) => data.map((d) => new Warehouses(d))).get(
		// WAREHOUSE.getAll,
		WAREHOUSE.getMyWarehouse,
		{ params }
	);
