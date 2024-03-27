import { useState, useCallback } from "react";

import { CCheckbox } from "_components/controls";
import { CTable, CPagination } from "_components/others";
import { money } from "src/utils/funcs";

export default ({ data, loading, isSelectAll, onSelect }) => {
	//#region Data
	const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

	const onPaginationChange = useCallback(
		(_paginate) => setPaginate(_paginate),
		[]
	);
	//#endregion

	//#region Event
	const select = useCallback(
		(code = -1) =>
			(e) =>
				onSelect(code, e),
		[onSelect]
	);
	//#endregion

	//#region Others
	const mapStatus = ({ approvedStatus }) => {
		switch (approvedStatus) {
			case 1:
			case 2:
				return (
					<td className="text-center font-weight-medium text-success">
						Xuất kho
					</td>
				);
			default:
				return (
					<td className="text-center font-weight-medium text-warning">
						Mới tạo
					</td>
				);
		}
	};
	//#endregion

	//#region Render
	const fields = [
		{
			key: "select",
			label: <CCheckbox value={isSelectAll} onChange={select()} />,
			sorter: false,
		},
		{
			key: "code",
			label: "Số ĐH",
			_style: { width: "150px", minWidth: "150px" },
		},
		{
			key: "storeName",
			label: "Chi nhánh",
			_style: { width: "250px", minWidth: "250px", textAlign: "left" },
			sorter: true,
		},
		{
			key: "total",
			label: "Thành tiền",
			_style: { width: "140px", minWidth: "140px", textAlign: "right" },
		},
		{
			key: "createdDate",
			label: "Ngày tạo",
			_style: { width: "200px", minWidth: "200px" },
		},
		{
			key: "date",
			label: "Ngày giao",
			_style: { width: "150px", minWidth: "150px" },
		},
		{
			key: "status",
			label: "Trạng thái",
			_style: { width: "150px", minWidth: "150px", textAlign: "center" },
		},
		{
			key: "note",
			label: "Ghi chú",
			_style: { width: "auto", minWidth: "350px", textAlign: "left" },
		},
	];

	const render = {
		select: ({ code, check }) => (
			<td>
				<CCheckbox value={check} onChange={select(code)} />
			</td>
		),
		storeName: ({ storeName }) => <td className="text-left">{storeName}</td>,
		total: (item) => <td className="text-right pr-4">{money(item.total)}</td>,
		createdAt: (item) => (
			<td className="text-right pr-3">{item.createdDate}</td>
		),
		deliveryAt: (item) => <td className="text-right pr-3">{item.issueDate}</td>,
		status: mapStatus,
		note: ({ note }) => <td className="text-left">{note}</td>,
		approvedBy: ({ approvedBy }) => (
			<td className="text-center">{approvedBy ?? "-"}</td>
		),
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
	//#endregion
};
