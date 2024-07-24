import { map } from "src/utils/axios";
import { Suppliers } from "src/utils/models/supplier.model";

import { SUPPLIER } from "./_constants";

export const getAll = async (params) =>
	await map(({ data }) => data.map((p) => new Suppliers(p))).get(SUPPLIER.getAll, {
		params,
	});
