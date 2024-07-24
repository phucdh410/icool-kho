import { FORM_HEADER_ENCODED,map, post } from "src/utils/axios";

import { Configurations } from "../utils/models/configuration.model";

import { CONFIGURATION } from "./_constants";

export const getAllSlips = async (params) =>
	await map(({ data }) => data.map((d) => new Configurations(d))).get(
		CONFIGURATION.getAllSlips,
		{ params }
	);

export const getAllExports = async (params) =>
	await map(({ data }) => data.map((d) => new Configurations(d))).get(
		CONFIGURATION.getAllExports,
		{ params }
	);

export const getMaterialGroupOf = async (code) =>
	await map(({ data }) => data.map((d) => d)).get(
		`${CONFIGURATION.getMaterialGroupOf}/${code}`
	);

export const updateSlip = async (data) => {
	const form = new URLSearchParams();

	data.forEach(({ id, value }) => {
		form.append(id, value);
	});

	return await post(CONFIGURATION.updateSlip, form, FORM_HEADER_ENCODED);
};

export const updateCategories = async (data) => {
	const form = new URLSearchParams();

	Object.keys(data).forEach((key) => {
		form.append(key, data[key]);
	});

	return await post(CONFIGURATION.updateCategories, form, FORM_HEADER_ENCODED);
};

export const removeCategories = async (codes) => {
	const params = new URLSearchParams();

	params.append("listCode", codes.join(","));

	return await post(CONFIGURATION.removeCategories, params, FORM_HEADER_ENCODED);
};
