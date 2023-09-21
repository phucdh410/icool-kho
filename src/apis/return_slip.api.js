import { map, post, FORM_HEADER_ENCODED } from "src/utils/axios";

import { RETURN_SLIP } from "./_constants";

import { format } from "src/utils/moment";

import {
	ReturnSlip,
	ReturnSlips,
	ReturnSlipPreview,
} from "../utils/models/return_slip.model";

export const getAll = async (params) =>
	await map(({ data }) => data.map((d) => new ReturnSlips(d))).get(
		RETURN_SLIP.getAll,
		{ params }
	);

export const getByCode = async (code) =>
	await map(({ data }) => new ReturnSlip(data)).get(
		`${RETURN_SLIP.getByCode}/${code}`
	);

export const getPreview = async (code) =>
	await map(({ data }) => new ReturnSlipPreview(data)).get(
		`${RETURN_SLIP.getPreview}/${code}`
	);

export const toExcel = (params = {}) => {
	if (params.startAt) params.startAt = format(params.startAt, "yyyy-MM-DD");
	if (params.endAt) params.endAt = format(params.endAt, "yyyy-MM-DD");

	get(RETURN_SLIP.export, { responseType: "blob", params }).then((res) =>
		fileDownload(res.data, "report.xlsx")
	);
};

export const create = async ({ ware, store, date, note, materials, files }) => {
	const form = new FormData();

	form.append("ware_id", ware);
	form.append("cuahang_id", store);
	form.append("date", date);
	form.append("note", note);
	form.append("materials", JSON.stringify(materials));
	files.forEach((file) => form.append("files", file));

	return await post(RETURN_SLIP.create, form, FORM_HEADER_ENCODED);
};

export const update = async ({
	code,
	ware,
	store,
	date,
	note,
	materials,
	files,
}) => {
	const form = new FormData();

	form.append("code", code);
	form.append("ware_id", ware);
	form.append("cuahang_id", store);
	form.append("date", date);
	form.append("note", note);
	form.append("materials", JSON.stringify(materials));
	files.forEach((file) => form.append("files", file));

	return await post(RETURN_SLIP.update, form, FORM_HEADER_ENCODED);
};

export const remove = async (codes) => {
	const params = new URLSearchParams();

	params.append("listCode", codes.join(","));

	return await post(RETURN_SLIP.delete, params, FORM_HEADER_ENCODED);
};