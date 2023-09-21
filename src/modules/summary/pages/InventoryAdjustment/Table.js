import { useMemo } from "react";

import { money, UID } from "src/utils/funcs";
import { format } from "src/utils/moment";

export default ({ data, onPreview }) => {
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
						<th style={{ width: "250px", minWidth: "250px" }}>Mã Phiếu</th>
						<th style={{ width: "250px", minWidth: "250px" }}>Ngày Hủy</th>
						<th style={{ width: "250px", minWidth: "250px" }}>Mã NVL</th>
						<th style={{ width: "250px", minWidth: "250px" }}>
							Tên nguyên vật liệu
						</th>
						<th style={{ width: "250px", minWidth: "250px" }}>Đơn vị</th>
						<th style={{ width: "250px", minWidth: "250px" }}>Số lượng</th>
						<th style={{ width: "250px", minWidth: "250px" }}>Đơn giá</th>
						<th style={{ width: "250px", minWidth: "250px" }}>Thành tiền</th>
						<th style={{ width: "250px", minWidth: "250px" }}>Ghi chú</th>
						<th style={{ width: "250px", minWidth: "250px" }}>Hình ảnh</th>
					</tr>
				</thead>
				<tbody>
					{correct.map((store) => (
						<>
							<tr key={`f_${store.id}_${UID()}`}>
								<td className="text-left font-weight-bold" colSpan={10}>
									{store.name}
								</td>
							</tr>
							{store.materials.map((material) => (
								<tr key={`${store.id}_${material.nvl_id}_${UID()}`}>
									<td>{material.code}</td>
									<td>{format(material.date)}</td>
									<td>{material.nvl_id}</td>
									<td>{material.nvl_name}</td>
									<td>{material.ware_unit}</td>
									<td>{material.ware_q}</td>
									<td>{money(material.price)}</td>
									<td>{money(material.total)}</td>
									<td>{material.note}</td>
									<td>
										<a
											href={`#preview?${material.file_name}`}
											onClick={onPreview(material.file)}
										>
											{material.file_name}
										</a>
									</td>
								</tr>
							))}
						</>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={10}>
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
