import { CCheckbox } from "src/common/components/controls";

import Row from "./Row";

export default ({ materials, isSelectedAll, onChange }) => {
	const select =
		(code = -1) =>
		(v) => {
			materials &&
				onChange(
					materials.map((m) =>
						!m.approvedStatus && (code === -1 || code === m.code)
							? { ...m, check: v }
							: m
					)
				);
		};

	return (
		<table className="table table-hover border c-table selectable">
			<thead>
				<tr>
					<th style={{ width: "50px", paddingLeft: "20px" }}>
						<CCheckbox value={isSelectedAll} onChange={select()} />
					</th>
					<th style={{ width: "150px", minWidth: "150px" }}>Trạng thái</th>
					<th style={{ width: "150px", minWidth: "150px" }}>Mã NVL</th>
					<th style={{ width: "150px", minWidth: "150px" }}>Tên NVL</th>
					<th style={{ width: "150px", minWidth: "150px" }}>Số lượng</th>
					<th style={{ width: "150px", minWidth: "150px" }}>ĐVT</th>
				</tr>
			</thead>
			<tbody>
				{materials?.map((m, index) => (
					<Row key={m.code} data={m} onSelect={select(m.code)} />
				))}
			</tbody>
		</table>
	);
};
