import { useCallback, useEffect, useMemo } from "react";

import { getAllMaterials } from "_common/queries-fn/export.query";

import { CTable } from "_components/others";
import { CCheckbox } from "_components/controls";

export default ({ filter, onSelect }) => {
	const { data, set } = getAllMaterials(filter);

	const isSelectAll = useMemo(
		() => data?.every((d) => d.check) ?? false,
		[data]
	);
	const selected = useMemo(() => data?.filter((d) => d.check) ?? [], [data]);

	const select = useCallback(
		(nvl_id = -1) =>
			(v) =>
				set(
					data?.map((d) =>
						nvl_id === -1 || d.nvl_id === nvl_id ? { ...d, check: v } : d
					)
				),
		[data]
	);

	useEffect(() => onSelect(selected.map((s) => s.nvl_id)), [selected]);

	const fields = [
		{
			key: "select",
			label: <CCheckbox value={isSelectAll} onChange={select()} />,
			sorter: false,
		},
		{
			key: "nvl_id",
			label: "Mã NVL",
			_style: { width: "25%", minWidth: "175px" },
		},
		{
			key: "name",
			label: "Tên NVL",
			_style: { width: "auto", minWidth: "200px", textAlign: "left" },
		},
	];

	const render = {
		select: ({ check, nvl_id }) => (
			<td>
				<CCheckbox value={check} onChange={select(nvl_id)} />
			</td>
		),
		name: ({ name }) => <td className="text-left">{name}</td>,
	};

	return (
		<CTable
			className="selectable"
			itemsPerPage={Infinity}
			data={data}
			fields={fields}
			render={render}
		/>
	);
};
