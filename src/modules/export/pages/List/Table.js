import { useState, useCallback } from "react";

import { CTable, CPagination } from "_components/others";
import { CCheckbox } from "_components/controls";

import MPreview from "../../components/Preview";

import { getPreview } from "_common/queries-fn/export.query";
import { money } from "src/utils/funcs";

export default ({ data, loading, isSelectAll, onSelect }) => {
	//#region Data
	const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

	const [preview, setPreview] = useState(null);
	//#endregion

	//#region Event
	const onPaginationChange = useCallback(
		(_paginate) => setPaginate(_paginate),
		[]
	);

	const onClose = useCallback(() => {
		setPreview(null);
	}, [preview]);

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
			label: (
				<div style={{ width: "100%" }}>
					<CCheckbox value={isSelectAll} onChange={select()} />
				</div>
			),
			sorter: false,
		},
		{
			key: "code",
			label: "Số ĐH",
			_style: { width: "150px", minWidth: "150px" },
		},
		{
			key: "storeName",
			label: "Đến chi nhánh",
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
			_style: { width: "140px", minWidth: "140px" },
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
		select: ({ check, code, approvedStatus }) => (
			<td>
				<CCheckbox
					value={check}
					onChange={select(code)}
					disabled={approvedStatus}
				/>
			</td>
		),
		code: (item) => (
			<td>
				<a
					href={`/preview/${item.code}`}
					onClick={(e) => e.preventDefault() || setPreview(item.code)}
				>
					{item.code}
				</a>
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
		<>
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
			{preview && (
				<MPreview code={preview} getter={getPreview} onClose={onClose} />
			)}
		</>
	);
	//#endregion
};
