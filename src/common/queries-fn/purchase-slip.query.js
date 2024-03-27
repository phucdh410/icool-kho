import { useMutation } from "react-query";

import createQuery from "src/utils/react-query/createQuery";

import * as api from "src/apis/purchase_slip.api";

import { format } from "src/utils/moment";

export const getAll = (params, isLoading = false, options = {}) => {
	const _params = { ...params };

	if (_params.startAt) _params.startAt = format(_params.startAt, "yyyy-MM-DD");
	if (_params.endAt) _params.endAt = format(_params.endAt, "yyyy-MM-DD");
	if (_params.date) _params.date = format(_params.date, "yyyy-MM-DD");

	return createQuery(["purchase_slips", _params], () => api.getAll(_params), {
		enabled: !isLoading,
		...options,
	});
};

export const getAllMaterials = (params, isLoading = false, options = {}) => {
	const _params = { ...params };

	if (_params.startAt) _params.startAt = format(_params.startAt, "yyyy-MM-DD");
	if (_params.endAt) _params.endAt = format(_params.endAt, "yyyy-MM-DD");
	if (_params.storeIds) _params.storeIds = _params.storeIds.join(",");
	if (_params.nvlGroupIds) _params.nvlGroupIds = _params.nvlGroupIds.join(",");

	return createQuery(
		["purchase_slips", "report-materials", _params],
		() => api.getMaterial(_params),
		{
			enabled: !isLoading,
			...options,
		}
	);
};

export const getAllReport = (params, isLoading = false, options = {}) => {
	const _params = { ...params };

	if (_params.startAt) _params.startAt = format(_params.startAt, "yyyy-MM-DD");
	if (_params.endAt) _params.endAt = format(_params.endAt, "yyyy-MM-DD");
	if (_params.storeIds) _params.storeIds = _params.storeIds.join(",");
	if (_params.nvlGroupIds) _params.nvlGroupIds = _params.nvlGroupIds.join(",");
	if (_params.listCode) _params.listCode = _params.listCode.join(",");

	return createQuery(
		["purchase_slips", "report", _params],
		() => api.getReport(_params),
		{
			enabled: !isLoading,
			...options,
		}
	);
};

export const getAllReportDetail = (params, isLoading = false, options = {}) => {
	const _params = { ...params };

	if (_params.startAt) _params.startAt = format(_params.startAt, "yyyy-MM-DD");
	if (_params.endAt) _params.endAt = format(_params.endAt, "yyyy-MM-DD");
	if (_params.storeIds) _params.storeIds = _params.storeIds.join(",");
	if (_params.nvlGroupIds) _params.nvlGroupIds = _params.nvlGroupIds.join(",");
	if (_params.listCode) _params.listCode = _params.listCode.join(",");

	return createQuery(
		["purchase_slips", "report-detail", _params],
		() => api.getAllReportDetail(_params),
		{
			enabled: !isLoading,
			...options,
		}
	);
};

export const getByCode = (code, isLoading, options = {}) =>
	createQuery(["purchase_slip", code], () => api.getByCode(code), {
		enabled: !isLoading,
		...options,
	});

export const getPreview = (item, isLoading, options = {}) => 
	createQuery(["purchase_slip", "preview", item], () => api.getPreview(item.code, item.storeCode), {
		enabled: !isLoading,
		...options,
	});

export const getForPrint = (codes, isLoading = false, options = {}) =>
	createQuery(["import", "prints", codes], () => api.getForPrint(codes), {
		enabled: !isLoading,
		...options,
	});

export const getForPrintByGroup = (code, isLoading = false, options = {}) =>
	createQuery(
		["import", "groups", "prints", code],
		() => api.getForPrintByGroup(code),
		{
			enabled: !isLoading,
			...options,
		}
	);

export const create = () =>
	useMutation(api.create, { retry: 3, retryDelay: 500 });

export const update = () =>
	useMutation(api.update, { retry: 3, retryDelay: 500 });

export const remove = () =>
	useMutation(api.remove, { retry: 3, retryDelay: 500 });
