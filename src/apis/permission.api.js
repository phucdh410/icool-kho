import { FORM_HEADER_ENCODED,map, post } from "src/utils/axios";

import { Permissions } from "_models/permission.model";

import { PERMISSION } from "./_constants";

export const getAll = async (params) =>
	await map(({ data }) => data.map((d) => new Permissions(d))).get(
		PERMISSION.getAllFunction,
		{ params }
	);

export const update = async ({ id, code, name, ...data }) => {
	const params = new URLSearchParams();

	params.append("id", id);
	params.append("code", code);
	params.append("name", name);

	Object.keys(data).forEach((key) =>
		params.append(key, JSON.stringify(data[key]))
	);

	return await post(PERMISSION.update, params, FORM_HEADER_ENCODED);
};
