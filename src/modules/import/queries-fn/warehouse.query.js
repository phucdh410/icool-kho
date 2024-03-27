import { getAll as func } from "_common/queries-fn/warehouse.query";

export const getAll = (params, isLoading = false) =>
	func(params, isLoading, {
		map: (d) =>
			d.map((_d) => ({
				data: _d,
				value: _d.code,
				label: _d.name,
			})),
	});
