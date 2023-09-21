import { CTable } from "_components/others";

import { CCheckbox } from "_components/controls";

export default ({ isLoading, data, status, onSelect, onRowClick }) => {
	//#region Event
	const select = (code) => (value) =>
		onSelect(data.map((d) => (d.code === code ? { ...d, check: value } : d)));
	//#endregion

	//#region Render
	const fields = [
		{
			key: "select",
			label: "",
			sorter: false,
		},
		{
			key: "code",
			label: "Mã Nhóm",
			_style: { width: "150px", minWidth: "150px", textAlign: "left" },
		},
		{
			key: "name",
			label: "Tên nhóm",
			_style: { width: "150px", minWidth: "150px", textAlign: "left" },
		},
	];

	const render = {
		select: ({ check, code }) => (
			<td>
				<CCheckbox disabled={status} value={check} onChange={select(code)} />
			</td>
		),
		code: ({ code }) => <td className="text-left">{code}</td>,
		name: ({ name }) => <td className="text-left">{name}</td>,
	};

	return (
		<CTable
			onRowClick={onRowClick}
			className="selectable"
			loading={isLoading}
			data={data ?? []}
			fields={fields}
			render={render}
		/>
	);
	//#endregion
};
