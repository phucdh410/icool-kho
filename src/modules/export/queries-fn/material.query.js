import { getAll as func } from "_common/queries-fn/material.query";

export const getAll = (params, isLoading) =>
	func(params, isLoading, {
		map: (d) => d.map((_d) => ({ data: _d, value: _d.code, label: _d.name }))
	});
