import { map, post, FORM_HEADER_ENCODED } from "src/utils/axios";

import { MATERIAL_GROUP } from "./_constants";

import { MaterialGroups } from "_models/material-group.model";

export const getForRole = async () =>
	await map(({ data }) => data).get(MATERIAL_GROUP.getForRole);

export const getAll = async (params) =>
	await map(({ data }) => data.map((d) => new MaterialGroups(d))).get(
		MATERIAL_GROUP.getAll,
		{ params }
	);

export const getByCode = async (code) =>
	await map().get(`${MATERIAL_GROUP.getByCode}/${code}`);

export const create = async ({ code, name }) => {
	const params = new URLSearchParams();

	params.append("code", code);
	params.append("name", name);

	return await post(MATERIAL_GROUP.create, params, FORM_HEADER_ENCODED);
};

export const update = async ({ code, name, active }) => {
	const params = new URLSearchParams();

	params.append("code", code);
	params.append("name", name);
	params.append("active", active);

	return await post(MATERIAL_GROUP.update, params, FORM_HEADER_ENCODED);
};

export const remove = async (codes) => {
	const params = new URLSearchParams();
	params.append("listCode", codes.join(","));
	return await post(MATERIAL_GROUP.delete, params, FORM_HEADER_ENCODED);
};
