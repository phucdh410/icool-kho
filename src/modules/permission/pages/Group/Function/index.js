import { FORM_GROUP } from "src/configs/constant";

import { getAllFunction } from "_common/queries-fn/permissions.query";

import Row from "./Row";

export default ({ isLoading, permissions, onChange }) => {
	//#region Data
	const { data: functions } = getAllFunction(
		{ groupId: FORM_GROUP },
		isLoading
	);
	//#endregion

	//#region Event
	const onValueChange = (code, value) => (e) => {
		permissions[code] = Math.max(
			(permissions[code] || 0) + (e ? 1 : -1) * value,
			0
		);
		onChange({ ...permissions });
	};
	//#endregion

	//#region Render
	return (
		<table className="table table-hover border c-table selectable">
			<thead>
				<tr>
					<th style={{ width: "25%", minWidth: "250px", textAlign: "left" }}>
						Chức năng
					</th>
					<th style={{ width: "50px", minWidth: "50px" }}>Xem</th>
					<th style={{ width: "50px", minWidth: "50px" }}>In</th>
					<th style={{ width: "50px", minWidth: "50px" }}>Thêm</th>
					<th style={{ width: "50px", minWidth: "50px" }}>Sửa</th>
					<th style={{ width: "50px", minWidth: "50px" }}>Xác nhận</th>
					<th style={{ width: "50px", minWidth: "50px" }}>Xóa</th>
				</tr>
			</thead>
			<tbody>
				{functions?.map((d, index) => (
					<Row
						key={d.code}
						code={d.code}
						name={d.name}
						value={permissions?.[d.code] || 0}
						onChange={onValueChange}
					/>
				))}
			</tbody>
		</table>
	);
	//#endregion
};
