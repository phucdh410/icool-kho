import fileDownload from "js-file-download";

import { FORM_HEADER_ENCODED,map, post } from "src/utils/axios";
import { format } from "src/utils/moment";

import {
	ExportSlip,
	ExportSlipPreview,
	ExportSlips,
	ExprotFormPrints,
} from "_models/export-slip.model";

import { EXPORT_SLIP } from "./_constants";

export const getAll = async (params) =>
	await map(({ data }) => data.map((d) => new ExportSlips(d))).get(
		EXPORT_SLIP.getAll,
		{ params }
	);

export const getByCode = async (code) =>
	await map(({ data }) => new ExportSlip(data)).get(
		`${EXPORT_SLIP.getByCode}/${code}`
	);

export const getMaterial = async (params) =>
	await map(({ data }) => data).get(EXPORT_SLIP.getMaterial, { params });

export const getReport = async ({ listCode, ...params }) => {
	return await map(({ data }) => data).get(
		`${EXPORT_SLIP.getReport}/${listCode}`,
		{ params }
	);
};

export const getAllReportDetail = async ({ listCode, ...params }) => {
	return await map(({ data }) => data).get(
		`${EXPORT_SLIP.getAllReportDetail}/${listCode}`,
		{ params }
	);
};

export const exportReport = async ({ listCode, ...params }) => {
	const _params = new URLSearchParams();

	if (params.startAt)
		_params.append("startAt", format(params.startAt, "yyyy-MM-DD"));
	if (params.endAt) _params.append("endAt", format(params.endAt, "yyyy-MM-DD"));
	if (params.storeIds) _params.append("storeIds", params.storeIds.join(","));
	if (params.nvlGroupIds)
		_params.append("nvlGroupIds", params.nvlGroupIds.join(","));

	post(`${EXPORT_SLIP.exportReport}/${listCode.join(",")}`, _params, {
		responseType: "blob",
		headers: FORM_HEADER_ENCODED,
	}).then((res) => fileDownload(res.data, "report.xlsx"));
};

export const exportReportDetail = async ({ listCode, ...params }) => {
	const _params = new URLSearchParams();

	if (params.startAt)
		_params.append("startAt", format(params.startAt, "yyyy-MM-DD"));
	if (params.endAt) _params.append("endAt", format(params.endAt, "yyyy-MM-DD"));
	if (params.storeIds) _params.append("storeIds", params.storeIds.join(","));
	if (params.nvlGroupIds)
		_params.append("nvlGroupIds", params.nvlGroupIds.join(","));

	post(`${EXPORT_SLIP.exportReportDetail}/${listCode.join(",")}`, _params, {
		responseType: "blob",
		headers: FORM_HEADER_ENCODED,
	}).then((res) => fileDownload(res.data, "report.xlsx"));
};

export const getForPrint = async (codes) =>
	await map(({ data }) => data.map((d) => new ExprotFormPrints(d))).get(
		`${EXPORT_SLIP.getForPrint}?code=${codes.join(",")}`
	);

export const getForPrintByGroup = async (code) =>
	await map(({ data }) => data.map((d) => new ExprotFormPrints(d))).get(
		`${EXPORT_SLIP.getForPrint}?code=${code}&group=true`
	);

export const getPreview = async (code) =>
	await map(({ data }) => new ExportSlipPreview(data)).get(
		`${EXPORT_SLIP.getPreview}/${code}`
	);

export const getByStore = async (code) =>
	await map(({ data }) => data.map((d) => new ExportSlips(d))).get(
		`${EXPORT_SLIP.getByStore}/${code}`
	);

export const create = async ({
	storeCode,
	date,
	note,
	sum,
	total,
	materials,
}) => {
	const params = new URLSearchParams();

	params.append("cuahang_id", storeCode);
	params.append("date", date);
	params.append("note", note);
	params.append("sum", sum);
	params.append("vat", total - sum);
	params.append("total", total);
	params.append("materials", JSON.stringify(materials));

	return await post(EXPORT_SLIP.create, params, FORM_HEADER_ENCODED);
};

export const update = async ({
	code,
	storeCode,
	date,
	note,
	sum,
	total,
	materials,
}) => {
	const params = new URLSearchParams();

	params.append("code", code);
	params.append("cuahang_id", storeCode);
	params.append("date", date);
	params.append("note", note);
	params.append("sum", sum);
	params.append("vat", total - sum);
	params.append("total", total);
	params.append("materials", JSON.stringify(materials));

	return await post(EXPORT_SLIP.update, params, FORM_HEADER_ENCODED);
};

export const approve = async ({ code, status }) => {
	const params = new URLSearchParams();

	params.append("code", code.join(","));
	params.append("status", true);

	return await post(EXPORT_SLIP.approve, params, FORM_HEADER_ENCODED);
};

export const remove = async (codes) => {
	const params = new URLSearchParams();

	params.append("listCode", codes.join(","));

	return await post(EXPORT_SLIP.delete, params, FORM_HEADER_ENCODED);
};
