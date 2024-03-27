import { useCallback, useState } from "react";

import { CCheckbox } from "_components/controls";
import { CTable, CPagination } from "_components/others";

import MPreview from "../../../components/Preview/Return";

import { getPreview } from "_common/queries-fn/inventory-return.query";

import { money } from "src/utils/funcs/";

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

	const onPreview = useCallback(
		(code) => (e) => e.preventDefault() || setPreview(code),
		[setPreview]
	);

	const onClose = useCallback(() => setPreview(null), []);

	const select = useCallback(
		(code = -1) =>
			(e) =>
				onSelect(code, e),
		[onSelect]
	);
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
			label: "Mã Phiếu",
			_style: { width: "200px", minWidth: "200px" },
		},
		{
			key: "storeName",
			label: "Chi nhánh",
			_style: { width: "350px", minWidth: "350px", textAlign: "left" },
			sorter: true,
		},
		{
			key: "createdDate",
			label: "Ngày tạo",
			_style: { width: "200px", minWidth: "200px" },
		},
		{
			key: "date",
			label: "Ngày trả",
			_style: { width: "120px", minWidth: "120px" },
		},
		{
			key: "total",
			label: "Tổng tiền",
			_style: { width: "150px", minWidth: "150px" },
		},
		{
			key: "note",
			label: "Ghi chú",
			_style: { width: "auto", minWidth: "350px", textAlign: "left" },
		},
	];

	const render = {
		select: ({ code, check, status }) => (
			<td>
				<CCheckbox value={check} onChange={select(code)} disabled={status} />
			</td>
		),
		code: ({ code }) => (
			<td>
				<a href={`#preview/${code}`} onClick={onPreview(code)}>
					{code}
				</a>
			</td>
		),
		storeName: ({ storeName }) => <td className="text-left">{storeName}</td>,
		total: ({ total }) => <td>{money(total)}</td>,
		note: ({ note }) => <td className="text-left">{note}</td>,
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
