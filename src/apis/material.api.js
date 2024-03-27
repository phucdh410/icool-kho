import { map, post, FORM_HEADER_ENCODED } from "src/utils/axios";

import { INVENTORY_SLIP, MATERIAL } from "./_constants";

import { Materials } from "_models/material.model";

export const getAll = async (params) => {
	return await map(({ data }) => data.map((d) => new Materials(d))).get(
		MATERIAL.getAll,
		{ params }
	);
};
export const getAllByUser = async ({ storeCode, ...params }) => {
	return await map(({ data }) => data.map((d) => new Materials(d))).get(
		`${MATERIAL.getAllByUser}/${storeCode}`,
		{ params }
	);
};

export const getAllUnCheckByStore = async (params) => {
	return await map(({ data }) => data.map((d) => new Materials(d))).get(
		`${INVENTORY_SLIP.getMaterial}`,
		{ params }
	);
};

export const getByGroup = async (code) => {
	return await map(({ data }) => data.map((d) => new Materials(d))).get(
		`${MATERIAL.getByGroupCode}/${code}`
	);
};
export const getByCode = async (code) =>
	await map(({ data }) => data).get(`${MATERIAL.getByCode}/${code}`);

export const create = async (data) => {
	const params = new URLSearchParams();

	Object.keys(data).forEach((key) => params.append(key, data[key]));

	return await post(MATERIAL.create, params, FORM_HEADER_ENCODED);
};

export const update = async (data) => {
	const params = new URLSearchParams();

	Object.keys(data).forEach((key) => params.append(key, data[key]));

	return await post(MATERIAL.update, params, FORM_HEADER_ENCODED);
};

export const remove = async (codes) => {
	const params = new URLSearchParams();

	params.append("listCode", codes.join(","));

	return await post(MATERIAL.delete, params, FORM_HEADER_ENCODED);
};
