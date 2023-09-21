import { useEffect, useCallback, useState } from "react";

import { Controller } from "react-hook-form";

import { CCheckbox, CInput } from "_components/controls";
import { CTable, CPagination } from "_components/others";
import { CBadge } from "@coreui/react";

const MaterialGroupTable = ({
	status,
	control,
	data,
	loading,
	isSelectAll,
	onSelect,
}) => {
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
			label: <CCheckbox value={isSelectAll} onChange={select()} />,
			sorter: false,
		},
		{
			key: "code",
			label: "Mã Nhóm",
			_style: { minWidth: "175px" },
		},
		{
			key: "name",
			label: "Tên Nhóm",
			_style: { minWidth: "200px", textAlign: "left" },
		},
		{
			key: "createdDate",
			label: "Ngày tạo",
			_style: { minWidth: "150px" },
		},
		{
			key: "createdBy",
			label: "Người tạo",
			_style: { minWidth: "150px" },
		},
		{
			key: "active",
			label: "Trạng thái",
			_style: { minWidth: "150px" },
		},
	];

	const render = {
		select: ({ check, code }) => (
			<td>
				<CCheckbox value={check} onChange={select(code)} />
			</td>
		),
		code: ({ code }) => <td>{code}</td>,
		name: ({ check, name }) => (
			<td className="text-left">
				{check && status === 3 ? (
					<Controller
						name="name"
						control={control}
						defaultValue=""
						render={({ field }) => <CInput {...field} />}
					/>
				) : (
					name
				)}
			</td>
		),
		active: ({ code, check, active }) => (
			<td>
				{check && status === 3 ? (
					<Controller
						name="active"
						control={control}
						render={({ field }) => (
							<CBadge
								style={{ cursor: "pointer" }}
								color={field.value ? "success" : "danger"}
								onClick={() => field.onChange(!field.value)}
							>
								{field.value ? "Active" : "Deactive"}
							</CBadge>
						)}
					/>
				) : (
					<CBadge color={active ? "success" : "danger"}>
						{active ? "Active" : "Deactive"}
					</CBadge>
				)}
			</td>
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
};

export default MaterialGroupTable;
