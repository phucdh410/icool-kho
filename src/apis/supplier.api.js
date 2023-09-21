import { SUPPLIER } from "./_constants";

import { map } from "src/utils/axios";

import { Suppliers } from "src/utils/models/supplier.model";

export const getAll = async (params) =>
	await map(({ data }) => data.map((p) => new Suppliers(p))).get(SUPPLIER.getAll, {
		params,
	});
