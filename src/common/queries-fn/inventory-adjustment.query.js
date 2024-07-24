import { useMutation } from "react-query";

import * as api from "src/apis/inventory_adjustment.api";
import { format } from "src/utils/moment";
import createQuery from "src/utils/react-query/createQuery";

export const getAll = (params, isLoading = false, options = {}) => {
	const _params = { ...params };

	if (_params.startAt) _params.startAt = format(_params.startAt, "yyyy-MM-DD");
	if (_params.endAt) _params.endAt = format(_params.endAt, "yyyy-MM-DD");

	return createQuery(
		["inventory-adjustments", _params],
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

	if (_params.nvlGroupIds) _params.nvlGroupIds = _params.nvlGroupIds.join(",");

	if (_params.nvlIds) _params.nvlIds = _params.nvlIds.join(",");

	return createQuery(
		["inventory-adjustments", "reports", _params],
		() => api.getAllReport(_params),
		{
			enabled: !isLoading,
			...options,
		}
	);
};

export const getByCode = (code, isLoading, options = {}) =>
	createQuery(["inventory_adjustment", code], () => api.getByCode(code), {
		enabled: !isLoading,
		...options,
	});

export const getMaterials = (code, isLoading, options = {}) =>
	createQuery(
		["inventory_adjustment", "materials", code],
		() => api.getMaterials(code),
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
