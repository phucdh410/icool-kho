import { useCallback,useState } from "react";

import { money } from "src/utils/funcs";

import { CCheckbox } from "_components/controls";
import { CPagination,CTable } from "_components/others";

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
	const mapStatus = (status) => {
		switch (status) {
			case -2:
			case -1:
				return (
					<td className="pr-4 font-weight-medium text-center text-danger">
						Từ chối
					</td>
				);
			case 1:
			case 2:
				return (
					<td className="pr-4 font-weight-medium text-center text-success">
						Đã duyệt
					</td>
				);
			default:
				return (
					<td className="pr-4 font-weight-medium text-center text-warning">
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
			label: "Số Phiếu",
			_style: { width: "200px", minWidth: "200px" },
		},
		{
			key: "storeName",
			label: "Chi nhánh",
			_style: { width: "250px", minWidth: "250px", textAlign: "start" },
		},
		{
			key: "total",
			label: "Thành tiền",
			_style: {
				width: "140px",
				minWidth: "140px"
			},
		},
		{
			key: "createdBy",
			label: "Người tạo",
			_style: { width: "200px", minWidth: "200px" },
		},
		{
			key: "issueDate",
			label: "Ngày giao",
			_style: { width: "150px", minWidth: "150px" },
		},
		{
			key: "status",
			label: "Trạng thái",
			_style: { width: "200px", minWidth: "200px" },
		},
		{
			key: "reason",
			label: "Ghi chú",
			_style: { width: "auto", minWidth: "350px", textAlign: "start" },
		},
	];

	const render = {
		select: ({ code, check }) => (
			<td>
				<CCheckbox value={check} onChange={select(code)} />
			</td>
		),
		total: ({ total }) => <td className="text-right">{money(total)}</td>,
		status: ({ status }) => mapStatus(status),
		storeName: ({ storeName }) => <td className="text-left">{storeName}</td>,
		reason: ({ reason }) => <td className="text-left">{reason}</td>,
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
