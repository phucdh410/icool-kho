import * as api from "src/apis/backlog_slip.api";
import { format } from "src/utils/moment";
import createQuery from "src/utils/react-query/createQuery";

export const getAll = (params, isLoading = false, options = {}) => {
	const _params = { ...params };

	if (_params.startAt) _params.startAt = format(_params.startAt, "yyyy-MM-DD");
	if (params.endAt) _params.endAt = format(_params.endAt, "yyyy-MM-DD");

	return createQuery(["inventory_slips", _params], () => api.getAll(_params), {
		enabled: !isLoading,
		...options,
	});
};

export const getInstants = (params, isLoading = false, options = {}) => {
	const _params = { ...params };

	if (_params.date) _params.date = format(_params.date, "yyyy-MM-DD");

	return createQuery(
		["inventory_slips", "instants", _params],
		() => api.getByWareCodeAndDate(_params.wareCode, _params.date, _params),
		{
			enabled: !isLoading,
			...options,
		}
	);
};
