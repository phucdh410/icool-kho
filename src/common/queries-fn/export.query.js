import { useMutation } from "react-query";

import * as api from "src/apis/export_slip.api";
import { format } from "src/utils/moment";
import createQuery from "src/utils/react-query/createQuery";

export const getAll = (params, isLoading = false, options = {}) => {
	const _params = { ...params };

	if (_params.startAt) _params.startAt = format(_params.startAt, "yyyy-MM-DD");
	if (_params.endAt) _params.endAt = format(_params.endAt, "yyyy-MM-DD");

	return createQuery(["exports", _params], () => api.getAll(_params), {
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
		["export_slips", "report-materials", _params],
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
		["export_slips", "report", _params],
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
		["export_slips", "report-detail", _params],
		() => api.getAllReportDetail(_params),
		{
			enabled: !isLoading,
			...options,
		}
	);
};

export const getByCode = (code, isLoading = false, options = {}) =>
	createQuery(["export", code], () => api.getByCode(code), {
		enabled: !isLoading,
		...options,
	});

export const getPreview = (code, isLoading = false, options = {}) =>
	createQuery(["export", "preview", code], () => api.getPreview(code), {
		enabled: !isLoading,
		...options,
	});

export const create = () =>
	useMutation(api.create, { retry: 3, retryDelay: 500 });

export const update = () =>
	useMutation(api.update, { retry: 3, retryDelay: 500 });

export const remove = () =>
	useMutation(api.remove, { retry: 3, retryDelay: 500 });

export const getForPrint = (codes, isLoading = false, options = {}) =>
	createQuery(["export", "prints", codes], () => api.getForPrint(codes), {
		enabled: !isLoading,
		...options,
	});

export const getForPrintByGroup = (code, isLoading = false, options = {}) =>
	createQuery(
		["export", "groups", "prints", code],
		() => api.getForPrintByGroup(code),
		{
			enabled: !isLoading,
			...options,
		}
	);
