import { CTable } from "_components/others";
import { CCheckbox } from "_components/controls";

export default ({ isLoading, data, isSelectAll, onSelect }) => {
	//#region Event
	const select = (id) => (v) => onSelect(id, v);
	//#endregion

	//#region Render
	const fields = [
		{
			key: "name",
			label: "Danh sách phiếu",
			_style: { minWidth: "350px", width: "auto", textAlign: "left" },
		},
		{
			key: "value",
			label: "Xác nhận",
			sorter: false,
			_style: { minWidth: "150px", width: "150px" },
		},
	];

	const render = {
		value: ({ value, id }) => (
			<td>
				<CCheckbox
					className="mx-auto"
					value={value == 1}
					onChange={select(id)}
				/>
			</td>
		),
		name: ({ name }) => <td className="text-left">{name}</td>,
	};

	return (
		<CTable
			loading={isLoading}
			data={data ?? []}
			fields={fields}
			render={render}
		/>
	);
	//#endregion
};
