import { getAll as func } from "_common/queries-fn/store.query";

export const getAll = (params, isLoading) =>
	func(params, isLoading, {
		map: (d) => [
			{
				value: "",
				label: "Tất cả",
			},
			...(d?.map((_d) => ({
				data: _d,
				value: _d.code,
				label: _d.name,
			})) ?? []),
		],
	});
