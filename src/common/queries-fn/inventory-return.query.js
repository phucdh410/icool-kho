import createQuery from "src/utils/react-query/createQuery";

import * as api from "src/apis/return_slip.api";

import { format } from "src/utils/moment";

export const getAll = (params, isLoading = false, options = {}) => {
	const _params = { ...params };

	if (_params.startAt) _params.startAt = format(_params.startAt, "yyyy-MM-DD");
	if (_params.endAt) _params.endAt = format(_params.endAt, "yyyy-MM-DD");

	return createQuery(
		["inventory_returns", _params],
		() => api.getAll(_params),
		{
			enabled: !isLoading,
			...options,
		}
	);
};

export const getByCode = (code, isLoading = false, options = {}) =>
	createQuery(["inventory_return", code], () => api.getByCode(code), {
		enabled: !isLoading,
		...options,
	});

export const getPreview = (code, isLoading = false, options = {}) =>
	createQuery(
		["inventory_return", "preview", code],
		() => api.getPreview(code),
		{
			enabled: !isLoading,
			...options,
		}
	);
