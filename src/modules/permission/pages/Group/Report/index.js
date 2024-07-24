import { SUMARY_GROUP } from "src/configs/constant";

import { getAllFunction } from "_common/queries-fn/permissions.query";

import Row from "./Row";

export default ({ isLoading, accessSummaries, onChange }) => {
	//#region Data
	const { data: functions } = getAllFunction(
		{ groupId: SUMARY_GROUP },
		isLoading
	);
	//#endregion

	//#region Event
	const onValueChange = (code, value) => (e) => {
		accessSummaries[code] = Math.max(
			(accessSummaries[code] || 0) + (e ? 1 : -1) * value,
			0
		);
		onChange({ ...accessSummaries });
	};
	//#endregion

	//#region Render

	return (
		<table className="table table-hover border c-table selectable">
			<thead>
				<tr>
					<th style={{ width: "50%", minWidth: "250px", textAlign: "left" }}>
						Chức năng
					</th>
					<th style={{ width: "50px", minWidth: "50px" }}>Xem</th>
					<th style={{ width: "50px", minWidth: "50px" }}>In</th>
				</tr>
			</thead>
			<tbody>
				{functions?.map((d, index) => (
					<Row
						key={d.code}
						code={d.code}
						name={d.name}
						value={accessSummaries[d.code] || 0}
						onChange={onValueChange}
					/>
				))}
			</tbody>
		</table>
	);
	//#endregion
};
