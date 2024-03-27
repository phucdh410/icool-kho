import { getByStore as func } from "_common/queries-fn/user.query";

export const getByStore = (params, isLoading) =>
	func(params, isLoading, {
		map: (d) =>
			d.map((_d) => ({
				data: _d,
				value: _d.code,
				label: _d.name,
			})),
	});
