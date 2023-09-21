import { useMemo } from "react";

import { UID } from "src/utils/funcs";
import { format } from "src/utils/moment";

export default ({ data }) => {
	//#region Event

	const total = useMemo(() => {
		if (!data) return 0;

		return Object.values(data)?.reduce(
			(total, current) => total + current.total,
			0
		);
	}, [data]);

	const correct = useMemo(() => {
		if (!data) return [];

		return Object.keys(data).map((id) => ({ ...data[id], id: id }));
	}, [data]);

	//#endregion

	const mapStatus = (status) => {
		if (status) return <span className="text-success">YES</span>;
		return <span className="text-danger">NO</span>;
	};

	return (
		<div className="table-responsive">
			<table className="table table-hover border c-table">
				<thead>
					<tr>
						<th
							style={{ width: "250px", minWidth: "250px", textAlign: "left" }}
						>
							Ngày kiểm{" "}
						</th>
						<th style={{ width: "250px", minWidth: "250px"}}>Nhóm hàng</th>
						<th style={{ width: "250px", minWidth: "250px" }}>Trạng thái</th>
						<th style={{ width: "250px", minWidth: "250px" }}>
							Thời gian nhập kiểm kho
						</th>
						<th style={{ width: "250px", minWidth: "250px" }}>
							Nhân viên kiểm kho
						</th>
					</tr>
				</thead>
				<tbody>
					{correct.map((store) => (
						<>
							<tr key={`f_${store.id}_${UID()}`}>
								<td className="text-left font-weight-bold" colSpan={6}>
									{store.store_name}
								</td>
							</tr>
							{store.slips.map((material) => (
								<tr key={`${store.id}_${material.nvl_id}_${UID()}`}>
									<td className="text-left">{format(material.checked)}</td>
									<td>{material.group_name}</td>
									<td>{mapStatus(material.approved_status)}</td>
									<td>{format(material.date)}</td>
									<td>{material.created_by}</td>
								</tr>
							))}
						</>
					))}
				</tbody>
			</table>
		</div>
	);
};
