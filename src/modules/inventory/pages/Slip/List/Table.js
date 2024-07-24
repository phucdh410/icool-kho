import { useCallback, useState } from "react";

import { money } from "src/utils/funcs";

import { CCheckbox } from "_components/controls";
import { CPagination,CTable } from "_components/others";

export default ({ data, loading, isSelectAll, onSelect }) => {
	const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

	const onPaginationChange = useCallback(
		(_paginate) => setPaginate(_paginate),
		[]
	);

	const select = useCallback(
		(code = -1) =>
			(e) =>
				onSelect(code, e),
		[onSelect]
	);

	const fields = [
		{
			key: "select",
			label: (
				<CCheckbox checked={isSelectAll ? "checked" : ""} onChange={select()} />
			),
			sorter: false,
		},
		{
			key: "code",
			label: "Mã NVL",
			_style: { width: "150px", minWidth: "150px" },
		},
		{
			key: "name",
			label: "Tên nguyên vật liệu",
			_style: { width: "auto", minWidth: "350px", textAlign: "left" },
			sorter: true,
		},
		{
			key: "wareUnit",
			label: "Đơn vị",
			_style: { width: "120px", minWidth: "120px" },
		},
		{
			key: "opening",
			label: "Tồn đầu",
			_style: { width: "120px", minWidth: "120px" },
		},
		{
			key: "imported",
			label: "Nhập",
			_style: { width: "120px", minWidth: "120px" },
		},
		{
			key: "exported",
			label: "Xuất",
			_style: { width: "120px", minWidth: "150px" },
		},
		{
			key: "cancelled",
			label: "Hủy hàng",
			_style: { width: "120px", minWidth: "150px" },
		},
		{
			key: "extra",
			label: "Hàng điều chỉnh",
			_style: { width: "180px", minWidth: "180px" },
		},
		{
			key: "closing",
			label: "Tồn kho",
			_style: { width: "120px", minWidth: "120px" },
		},
		{
			key: "total",
			label: "Thành tiền",
			_style: { width: "150px", minWidth: "150px" },
			sorter: true,
		},
	];

	const render = {
		select: ({ code, check, status }) => (
			<td>
				<CCheckbox
					checked={check ? "checked" : ""}
					onChange={select(code)}
					disabled={status}
				/>
			</td>
		),
		name: ({ name }) => <td className="text-left">{name}</td>,
		total: ({ total }) => <td className="text-right">{money(total)}</td>,
	};

	return (
		<CTable
			className="selectable"
			loading={loading}
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
