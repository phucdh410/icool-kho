import { useState, useCallback } from "react";

import { CCheckbox } from "_components/controls";
import { CTable, CPagination } from "_components/others";

export default ({ isSelectAll, data, status, onSelect, onPreview }) => {
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
			label: (
				<CCheckbox disabled={status} value={isSelectAll} onChange={select()} />
			),
			sorter: false,
		},
		{
			key: "code",
			label: "Mã Phiếu",
			_style: { minWidth: "250px", width: "250px" },
		},
		{
			key: "wareName",
			label: "Kho",
			_style: { minWidth: "200px", width: "auto", textAlign: "left" },
		},
		{
			key: "date",
			label: "Ngày tạo",
			_style: { minWidth: "200px", width: "200px" },
		},
		{
			key: "file",
			label: "File Đính Kèm",
			_style: { minWidth: "250px", width: "250px" },
		},
	];

	const render = {
		select: ({ check, code }) => (
			<td>
				<CCheckbox disabled={status} value={check} onChange={select(code)} />
			</td>
		),
		wareName: ({ wareName }) => <td className="text-left">{wareName}</td>,
		file: ({ file, fileName }) => (
			<td>
				{file ? (
					<a href={`#preview?${fileName}`} onClick={onPreview(file, fileName)}>
						{fileName}
					</a>
				) : (
					<>{fileName}</>
				)}
			</td>
		),
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
