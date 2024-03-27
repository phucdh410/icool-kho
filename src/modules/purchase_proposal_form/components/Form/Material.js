import { useMemo } from "react";

import Row from "./Row";

export default ({ materials, data, onChange }) => {
	//#region Data
	const ignore = useMemo(
		() => data.filter((d) => d.code !== "").map((d) => d.code),
		[data]
	);
	//#endregion

	//#region Event
	const change = (index) => (_data) => {
		const _new = [...data];
		_new[index] = _data;
		onChange(_new);
	};

	const select = (index) => (v) => {
		const _new = [...data];
		_new[index] = { ..._new[index], check: v };
		onChange(_new);
	};
	//#endregion

	//#region Render
	return (
		<table className="table table-hover border c-table">
			<thead>
				<tr>
					<th
						style={{ width: "50px", paddingLeft: "20px", paddingRight: "24px" }}
					></th>
					<th style={{ width: "8%", minWidth: "150px", paddingRight: "24px" }}>
						Mã NVL
					</th>
					<th
						style={{ width: "auto", minWidth: "450px", paddingRight: "24px" }}
					>
						Tên NVL
					</th>
					<th style={{ width: "10%", minWidth: "150px", paddingRight: "24px" }}>
						ĐVT
					</th>
					<th style={{ width: "10%", minWidth: "100px", paddingRight: "24px" }}>
						Số lượng
					</th>
					<th style={{ width: "15%", minWidth: "150px", paddingRight: "24px" }}>
						Thành tiền
					</th>
					<th style={{ width: "15%", minWidth: "150px", paddingRight: "24px" }}>
						Ghi chú
					</th>
				</tr>
			</thead>
			<tbody>
				{data.map((d, index) => (
					<Row
						key={d.id || d.code}
						data={d}
						options={materials}
						ignore={ignore}
						onChange={change(index)}
						onSelect={select(index)}
					/>
				))}
			</tbody>
		</table>
	);
	//#endregion
};
