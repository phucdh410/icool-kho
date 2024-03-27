import { getForRole as func } from "_common/queries-fn/material-group.query";

export const getAll = (isLoading) =>
	func(isLoading, {
		map: (d) =>
			d.map((_d) => ({
				data: _d,
				value: _d.code,
				label: _d.name,
			})),
	});
