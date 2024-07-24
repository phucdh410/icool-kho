import { FORM_HEADER_ENCODED,map, post } from "src/utils/axios";
import { Roles } from "src/utils/models/role.model";

import { ROLE } from "./_constants";

export const getAll = async (params) =>
	await map(({ data }) => data.map((p) => new Roles(p))).get(ROLE.getAll, {
		params,
	});

export const getUserByRole = async (id) =>
	await map(({ data }) => data.map((p) => p)).get(
		`${ROLE.getUserByRole}/${id}`
	);

export const getPermissionByRole = async (id) =>
	await map(({ data }) => data.permissions).get(
		`${ROLE.getPermissionByRole}/${id}`
	);

export const getMaterialGroupsByRole = async (id) =>
	await map(({ data }) =>
		data.reduce((t, a) => ({ ...t, [a.group_id]: a.active }), {})
	).get(`${ROLE.getMaterialGroupsByRole}/${id}`);

export const create = async ({ code, name }) => {
	const params = new URLSearchParams();

	params.append("code", code);
	params.append("name", name);

	return await post(ROLE.create, params, FORM_HEADER_ENCODED);
};

export const remove = async (codes) => {
	const params = new URLSearchParams();

	params.append("listCode", codes.join(","));

	return await post(ROLE.delete, params, FORM_HEADER_ENCODED);
};
