import { getForRole } from "_common/queries-fn/material-group.query";

import Row from "./Row";

export default ({ isLoading, accessGroups, onChange }) => {
	//#region Data
	const { data: materialsGroups } = getForRole(isLoading);
	//#endregion

	//#region Event
	const onValueChange = (code) => (v) => {
		accessGroups[code] = v;
		onChange({ ...accessGroups });
	};
	//#endregion

	//#region
	return (
		<table className="table table-hover border c-table selectable">
			<thead>
				<tr>
					<th style={{ width: "75%", minWidth: "450px", textAlign: "left" }}>
						Danh sách phiếu
					</th>
					<th style={{ width: "25%", minWidth: "50px" }}>Xác nhận</th>
				</tr>
			</thead>
			<tbody>
				{materialsGroups?.map((d, index) => (
					<Row
						key={d.code}
						code={d.code}
						name={d.name}
						value={accessGroups[d.code]}
						onChange={onValueChange}
					/>
				))}
			</tbody>
		</table>
		//#endregion
	);
};
