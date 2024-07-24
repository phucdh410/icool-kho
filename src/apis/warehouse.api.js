import { map } from "src/utils/axios";

import { Warehouses } from "_models/warehouse.model";

import { WAREHOUSE } from "./_constants";

export const getAll = async (params) =>
	await map(({ data }) => data.map((d) => new Warehouses(d))).get(
		// WAREHOUSE.getAll,
		WAREHOUSE.getMyWarehouse,
		{ params }
	);
