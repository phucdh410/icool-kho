import { useState, useCallback } from "react";

import { CCheckbox } from "_components/controls";
import { CTable, CPagination } from "_components/others";

export default ({ isSelectAll, data, onSelect }) => {
	const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

	const onPaginationChange = useCallback(
		(_paginate) => setPaginate(_paginate),
		[]
	);

	const select =
		(code = -1) =>
		(v) =>
			onSelect(code, v);

	const fields = [
		{
			key: "select",
			label: <CCheckbox value={isSelectAll} onChange={select()} />,
			sorter: false,
		},
		{
			key: "code",
			label: "Mã NVL",
			_style: { width: '25%', minWidth: "175px" },
		},
		{
			key: "name",
			label: "Tên NVL",
			_style: { width: 'auto', minWidth: "200px", textAlign: "left" },
		},
	];

	const render = {
		select: ({ check, code }) => (
			<td>
				<CCheckbox value={check} onChange={select(code)} />
			</td>
		),
		name: ({ name }) => <td className="text-left">{name}</td>,
	};

	return (
		<CTable
			className="selectable"
			data={data}
			page={paginate.page}
			itemsPerPage={paginate.limit}
			fields={fields}
			render={render}
			footer={
				<CPagination
					page={paginate.page}
					total={data?.length}
					limit={paginate.limit}
					onPaginationChange={onPaginationChange}
				/>
			}
		/>
	);
};
