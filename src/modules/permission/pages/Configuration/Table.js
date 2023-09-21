import { CTable } from "_components/others";
import { CCheckbox } from "_components/controls";

export default ({ isLoading, data, status, onSelect }) => {
	//#region Event
	const select = (code) => (v) => onSelect(code, v);
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
			label: "Phân loại",
			_style: { minWidth: "175px", textAlign: "left" },
		},
	];

	const render = {
		select: ({ check, code }) => (
			<td>
				<CCheckbox disabled={status} value={check} onChange={select(code)} />
			</td>
		),
		code: ({ code }) => <td className="text-left">Nhóm in: {code}</td>,
	};

	return (
		<CTable
			className="selectable"
			loading={isLoading}
			data={data ?? []}
			fields={fields}
			render={render}
		/>
	);
	//#endregion
};
