import { useMemo } from "react";

import { money, UID } from "src/utils/funcs";

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

	return (
		<div className="table-responsive">
			<table className="table table-hover border c-table">
				<thead>
					<tr>
						<th style={{ width: "250px", minWidth: "250px" }}>Mã NVL</th>
						<th style={{ width: "250px", minWidth: "250px" }}>
							Tên Nguyên Vật Liệu
						</th>
						<th style={{ width: "250px", minWidth: "250px" }}>Đơn vị</th>
						<th style={{ width: "250px", minWidth: "250px" }}>Số lượng</th>
						<th style={{ width: "250px", minWidth: "250px" }}>Đơn giá TB</th>
						<th style={{ width: "250px", minWidth: "250px" }}>Thành tiền</th>
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
							{store.materials.map((material) => (
								<tr key={`${store.id}_${material.nvl_id}_${UID()}`}>
									<td>{material.nvl_id}</td>
									<td>{material.name}</td>
									<td>{material.ware_unit}</td>
									<td>{material.quantity}</td>
									<td>{money(material.avg)}</td>
									<td>{money(material.total)}</td>
								</tr>
							))}
						</>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={6}>
							<div className="d-flex font-weight-bold justify-content-around">
								<div className="text-upper">Tổng cộng</div>
								<div>{money(total)}</div>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};
