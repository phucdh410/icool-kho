import * as api from "src/apis/cancellation_slip.api";
import { format } from "src/utils/moment";
import createQuery from "src/utils/react-query/createQuery";

export const getAll = (params, isLoading = false, options = {}) => {
	const _params = { ...params };

	if (_params.startAt) _params.startAt = format(_params.startAt, "yyyy-MM-DD");
	if (_params.endAt) _params.endAt = format(_params.endAt, "yyyy-MM-DD");

	return createQuery(
		["inventory_cancels", _params],
		() => api.getAll(_params),
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

	if (_params.responsible) _params.responsible = _params.responsible;

	return createQuery(
		["inventory_cancels", "reports", _params],
		() => api.getAllReport(_params),
		{
			enabled: !isLoading,
			...options,
		}
	);
};

export const getDetailReport = (params, isLoading = false, options = {}) => {
	const _params = { ...params };

	if (_params.startAt) _params.startAt = format(_params.startAt, "yyyy-MM-DD");
	if (_params.endAt) _params.endAt = format(_params.endAt, "yyyy-MM-DD");

	if (_params.storeIds) _params.storeIds = _params.storeIds.join(",");

	if (_params.responsible) _params.responsible = _params.responsible;

	return createQuery(
		["inventory_cancels", "reports", _params],
		() => api.getDetailReport(_params),
		{
			enabled: !isLoading,
			...options,
		}
	);
};

export const getByCode = (code, isLoading = false, options = {}) =>
	createQuery(["inventory_cancel", code], () => api.getByCode(code), {
		enabled: !isLoading,
		...options,
	});

export const getPreview = (code, isLoading = false, options = {}) => {
	return createQuery(
		["inventory_cancel", "preview", code],
		() => api.getPreview(code),
		{
			enabled: !isLoading,
			...options,
		}
	);
};

export const getResponsible = (code, isLoading = false, options = {}) =>
	createQuery(
		["inventory_cancel", "responsible", code],
		() => api.getResponsible(code),
		{
			enabled: !isLoading,
			...options,
		}
	);
