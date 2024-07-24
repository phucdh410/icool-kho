import fileDownload from "js-file-download";

import { FORM_HEADER_ENCODED,map, post } from "src/utils/axios";
import { format } from "src/utils/moment";

import {
	ImportFormPrints,
	PurchaseSlip,
	PurchaseSlipPreview,
	PurchaseSlips,
} from "_models/purchase-slip.model";

import { PURCHASE_SLIP } from "./_constants";

export const getAll = async (params) =>
	await map(({ data }) => data.map((d) => new PurchaseSlips(d)) ?? []).get(
		PURCHASE_SLIP.getAll,
		{ params }
	);

export const getByCode = async (code) =>
	await map(({ data }) => new PurchaseSlip(data)).get(
		`${PURCHASE_SLIP.getByCode}/${code}`
	);

export const getMaterial = async (params) =>
	await map(({ data }) => data).get(PURCHASE_SLIP.getMaterial, { params });

export const getReport = async ({ listCode, ...params }) => {
	return await map(({ data }) => data).get(
		`${PURCHASE_SLIP.getReport}/${listCode}`,
		{ params }
	);
};

export const getAllReportDetail = async ({ listCode, ...params }) => {
	return await map(({ data }) => data).get(
		`${PURCHASE_SLIP.getAllReportDetail}/${listCode}`,
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

	post(`${PURCHASE_SLIP.exportReport}/${listCode.join(",")}`, _params, {
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

	post(`${PURCHASE_SLIP.exportReportDetail}/${listCode.join(",")}`, _params, {
		responseType: "blob",
		headers: FORM_HEADER_ENCODED,
	}).then((res) => fileDownload(res.data, "report.xlsx"));
};

export const getPreview = async (code, storeCode) =>
	await map(({ data }) => new PurchaseSlipPreview(data)).get(
		`${PURCHASE_SLIP.getPreview}/${code}?storeCode=${storeCode}`
	);

export const getForPrint = async (codes) =>
	await map(({ data }) => data.map((d) => new ImportFormPrints(d))).get(
		`${PURCHASE_SLIP.getForPrint}?code=${codes.join(",")}`
	);

export const getForPrintByGroup = async (code) =>
	await map(({ data }) => data.map((d) => new ImportFormPrints(d))).get(
		`${PURCHASE_SLIP.getForPrint}?code=${code}&group=true`
	);

export const create = async ({
	storeCode,
	date,
	expired,
	consignee,
	supplier,
	wareCode,
	note,
	materials,
}) => {
	const params = new URLSearchParams();

	expired = date;

	params.append("cuahang_id", storeCode);
	params.append("date", date);
	params.append("expired", expired);
	params.append("consignee", consignee);
	params.append("supplier_id", supplier);
	params.append("ware_id", wareCode);
	params.append("note", note);
	params.append("materials", JSON.stringify(materials));

	return await post(PURCHASE_SLIP.create, params, FORM_HEADER_ENCODED);
};

export const update = async ({
	code,
	storeCode,
	date,
	expired,
	consignee,
	supplier,
	wareCode,
	note,
	materials,
}) => {
	const params = new URLSearchParams();

	expired = date;

	params.append("code", code);
	params.append("cuahang_id", storeCode);
	params.append("date", date);
	params.append("expired", expired);
	params.append("consignee", consignee);
	params.append("supplier_id", supplier);
	params.append("ware_id", wareCode);
	params.append("note", note);
	params.append("materials", JSON.stringify(materials));

	return await post(PURCHASE_SLIP.update, params, FORM_HEADER_ENCODED);
};

export const approve = async ({ code, status }) => {
	const params = new URLSearchParams();

	params.append("listCode", code.join(","));
	params.append("status", true);

	return await post(PURCHASE_SLIP.approve, params, FORM_HEADER_ENCODED);
};

export const remove = async (codes) => {
	const params = new URLSearchParams();

	params.append("listCode", codes.join(","));

	return await post(PURCHASE_SLIP.delete, params, FORM_HEADER_ENCODED);
};
