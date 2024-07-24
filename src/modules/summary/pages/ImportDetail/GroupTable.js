import { useMemo } from "react";

import { money, UID } from "src/utils/funcs";
import { format } from "src/utils/moment";

import { Ban } from "_assets/icons";
import { getAllReportDetail } from "_common/queries-fn/purchase-slip.query";

export default ({ filter }) => {
	//#region Data
	const { data } = getAllReportDetail(filter, !filter?.listCode?.length);

	const correct = useMemo(() => {
		if (!data) return [];

		return Object.keys(data).map((id) => ({ ...data[id], id: id }));
	}, [data]);
	//#endregion

	//#region Render
	return (
		<>
			<table className="table table-hover border c-table">
				<thead>
					<tr>
						<th
							style={{ width: "150px", minWidth: "150px", textAlign: "left" }}
						>
							Mã hàng
						</th>
						<th
							style={{ width: "350px", minWidth: "350px", textAlign: "left" }}
						>
							Tên sản phẩm
						</th>
						<th
							style={{ width: "150px", minWidth: "150px", textAlign: "left" }}
						>
							Ngày nhập
						</th>
						<th
							style={{ width: "150px", minWidth: "150px", textAlign: "center" }}
						>
							ĐVT
						</th>
						<th
							style={{ width: "150px", minWidth: "150px", textAlign: "center" }}
						>
							Số lượng
						</th>
						<th
							style={{ width: "150px", minWidth: "150px", textAlign: "right" }}
						>
							Đơn giá TB
						</th>
						<th
							style={{ width: "150px", minWidth: "150px", textAlign: "right" }}
						>
							Thành tiền
						</th>
					</tr>
				</thead>
				<tbody>
					{data ? (
						correct.map((group) => (
							<>
								<tr key={`f_${group.id}_${UID()}`}>
									<td className="text-left font-weight-bold" colSpan={11}>
										{group.name}
									</td>
								</tr>
								{group.materials.map((material) => (
									<tr key={`${group.id}_${material.id}_${UID()}`}>
										<td>{material.id}</td>
										<td>{material.name}</td>
										<td>{format(material.date,'DD-MM-YYYY')}</td>
										<td>{material.unit}</td>
										<td>{material.total}</td>
										<td className="text-right">{money(material.avg)}</td>
										<td className="text-right">{money(material.sum)}</td>
									</tr>
								))}
							</>
						))
					) : (
						<tr>
							<td colSpan={7}>
								<div className="text-center my-5">
									<h2>Chưa có dữ liệu</h2>
									<Ban className="c-icon c-icon-custom-size text-danger mb-2" />
								</div>
							</td>
						</tr>
					)}

					{/* {data ? (
						data?.map((d) => (
							<tr key={d.id}>
								<td>{data.code}</td>
								<td>{data.name}</td>
								<td>{data.providerUnit}</td>
								<td>{data.providerQ}</td>
								<td>{data.avg}</td>
								<td>{data.total}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={6}>
								<div className="text-center my-5">
									<h2>Chưa có dữ liệu</h2>
									<Ban className="c-icon c-icon-custom-size text-danger mb-2" />
								</div>
							</td>
						</tr>
					)} */}
				</tbody>
			</table>
		</>
	);
	//#endregion
};
