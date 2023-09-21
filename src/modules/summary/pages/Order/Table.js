import { useMemo, useState, useCallback } from "react";

import { CTooltip } from "@coreui/react";
import { CTable, CPagination } from "src/common/components/others";

import { getShortNameStore } from "src/utils/funcs";

export default ({ loading, data, stores }) => {
	const fields = useMemo(() => {
		return [
			{
				key: "group",
				label: "Ngành hàng",
				_style: { width: "200px", minWidth: "200px" },
			},
			{
				key: "code",
				label: "Mã hàng",
				_style: { width: "200px", minWidth: "200px" },
			},
			{
				key: "name",
				label: "Tên sản phẩm",
				_style: { width: "400px", minWidth: "400px", textAlign: "left" },
			},
			{
				key: "unit",
				label: "Đơn vị",
				_style: { width: "200px", minWidth: "200px" },
			},
			{
				key: "total",
				label: "Tổng cộng",
				_style: { width: "150px", minWidth: "150px" },
			},
			...stores?.map((w) => ({
				key: w.value,
				label: (
					<CTooltip content={w.label}>
						<span>{getShortNameStore(w.label) || ""}</span>
					</CTooltip>
				),
				_style: { width: "200px", minWidth: "200px" },
			})),
		];
	}, [stores]);

	const render = {
		name: ({ name }) => <td className="text-left">{name}</td>,
	};

	const _data = useMemo(() => {
		if (!data) return [];

		return Object.values(data)?.map((d) => {
			return {
				...d,
				...stores.reduce(
					(_t, s) => ({ ..._t, [s.value]: d.stores[s.value] ?? 0 }),
					{}
				),
			};
		});
	});

	const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

	//#region Event
	const onPaginationChange = useCallback(
		(_paginate) => setPaginate(_paginate),
		[]
	);

	//#endregion

	return (
		<>
			<CTable
				loading={loading}
				data={_data}
				render={render}
				page={paginate.page}
				itemsPerPage={paginate.limit}
				fields={fields}
				footer={
					<CPagination
						page={paginate.page}
						total={_data?.length}
						limit={paginate.limit}
						onPaginationChange={onPaginationChange}
					/>
				}
			/>
		</>
	);
};
