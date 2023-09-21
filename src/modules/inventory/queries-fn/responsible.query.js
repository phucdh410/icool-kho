import { getResponsible as func } from "_common/queries-fn/inventory-cancel.query";

export const getResponsible = (params, isLoading) =>
	func(params, isLoading, {
		map: (d) =>
			d.map((_d) => ({
				data: _d,
				value: _d.code,
				label: _d.name,
			})),
	});
