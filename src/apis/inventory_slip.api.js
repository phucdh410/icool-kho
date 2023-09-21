import fileDownload from "js-file-download";

import { map, post, FORM_HEADER_ENCODED } from "src/utils/axios";

import { INVENTORY_SLIP } from "./_constants";

import {
	InventorySlips,
	InventorySlip,
	InventorySlipPreview,
} from "_models/inventory-slip.model";

import { format } from "src/utils/moment";

export const getAll = async (params) =>
	await map(({ data }) => data.map((d) => new InventorySlips(d))).get(
		INVENTORY_SLIP.getAll,
		{ params }
	);

export const getAllReport = async (params) =>
	await map(({ data }) => data).get(INVENTORY_SLIP.getAllReport, { params });

export const getDetailReport = async (params) =>
	await map(({ data }) => data).get(INVENTORY_SLIP.getDetailReport, {
		params,
	});

export const exportReport = async (params) => {
	const _params = new URLSearchParams();

	if (params.startAt)
		_params.append("startAt", format(params.startAt, "yyyy-MM-DD"));

	if (params.endAt) _params.append("endAt", format(params.endAt, "yyyy-MM-DD"));

	if (params.storeIds) _params.append("storeIds", params.storeIds.join(","));

	post(INVENTORY_SLIP.exportReport, params, {
		responseType: "blob",
	}).then((res) => fileDownload(res.data, "report.xlsx"));
};

export const getByCode = async (code) =>
	await map(({ data }) => new InventorySlip(data)).get(
		`${INVENTORY_SLIP.getByCode}/${code}`
	);

export const getPreview = async (code) =>
	await map(({ data }) => new InventorySlipPreview(data)).get(
		`${INVENTORY_SLIP.getPreview}/${code}`
	);

export const create = async ({
	wareCode,
	storeCode,
	checked,
	note,
	value,
	materials,
	groupCode
}) => {
	const params = new URLSearchParams();

	params.append("wareCode", wareCode);
	params.append("storeCode", storeCode);
	params.append("value", value);
	params.append("note", note);
	params.append("checked", checked);
	params.append("materials", JSON.stringify(materials));
	params.append("groupCode", groupCode)

	return await post(`${INVENTORY_SLIP.create}`, params, FORM_HEADER_ENCODED);
};

export const update = async ({
	code,
	wareCode,
	storeCode,
	checked,
	note,
	value,
	materials,
}) => {
	const params = new URLSearchParams();

	params.append("code", code);
	params.append("wareCode", wareCode);
	params.append("storeCode", storeCode);
	params.append("value", value);
	params.append("note", note);
	params.append("checked", checked);
	params.append("materials", JSON.stringify(materials));

	return await post(`${INVENTORY_SLIP.update}`, params, FORM_HEADER_ENCODED);
};

export const approve = async ({ code, status }) => {
	const params = new URLSearchParams();

	params.append("code", code);
	params.append("status", status);

	return await post(`${INVENTORY_SLIP.approve}`, params, FORM_HEADER_ENCODED);
};

export const remove = async (codes) => {
	const params = new URLSearchParams();
	params.append("listCode", codes.join(","));
	return await post(`${INVENTORY_SLIP.delete}`, params, FORM_HEADER_ENCODED);
};
