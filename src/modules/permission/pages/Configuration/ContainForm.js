import { forwardRef, useImperativeHandle, useState } from "react";

import { CDualListBox } from "_components/controls";

import { getAll } from "../../queries-fn/material-group.query";

export default forwardRef(({}, ref) => {
	//#region Data
	const { data: materialGroups } = getAll();
	//#endregion
	const [selected, setSelected] = useState(["one"]);

	//#region Event
	const onChange = (selected) => setSelected(selected);
	//#endregion

	useImperativeHandle(ref, () => ({
		setSelected,
		getSelected: () => selected,
	}));

	//#region Render
	return (
		<>
			<CDualListBox
				canFilter
				showHeaderLabels
				lang={{
					availableHeader: "Nhóm",
					selectedHeader: "Gồm",
				}}
				options={materialGroups ?? []}
				selected={selected}
				onChange={onChange}
			/>
		</>
	);
	//#endregion
});
