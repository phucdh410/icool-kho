import fileDownload from "js-file-download";
import { map, get } from "src/utils/axios";

import { BACKLOG_SLIP } from "./_constants";

import { BacklogSlips, BacklogSlipInstants } from "_models/backlog-slip.model";

import { format } from "src/utils/moment";

export const getAll = async (params) =>
	await map(({ data }) => data?.map((d) => new BacklogSlips(d)) || []).get(
		BACKLOG_SLIP.getAll,
		{ params }
	);

export const getByStoreAndDate = async (store, date) =>
	await map(({ data }) => data?.map((d) => new BacklogSlipInstants(d))).get(
		`${BACKLOG_SLIP.getByStoreAndDate}/${store}/${date}`
	);

export const getByWareCodeAndDate = async (store, date, params) =>
	await map(({ data }) => data?.map((d) => new BacklogSlipInstants(d))).get(
		`${BACKLOG_SLIP.getByWareCodeAndDate}/${store}/${date}`,
		{ params }
	);

export const toExcel = (params = {}) => {
	if (params.startAt) params.startAt = format(params.startAt, "yyyy-MM-DD");
	if (params.endAt) params.endAt = format(params.endAt, "yyyy-MM-DD");

	get(BACKLOG_SLIP.export, { responseType: "blob", params }).then((res) =>
		fileDownload(res.data, "report.xlsx")
	);
};

export const toExcelByWareCodeAndDate = (params = {}) => {
	if (params.date) params.date = format(params.date, "yyyy-MM-DD");

	const { wareCode, date, ..._params } = params;

	get(`${BACKLOG_SLIP.exportByWareCodeAndDate}/${wareCode}/${date}`, {
		responseType: "blob",
		_params,
	}).then((res) => fileDownload(res.data, "report.xlsx"));
};
