import { CRow, CCol } from "@coreui/react";

import styled from "styled-components";

import { CTable } from "src/common/components/others";
import { money } from "src/utils/funcs";

const MTable = styled(CTable)`
	border: 1px solid #d8dbe0 !important;
	th,
	td {
		padding-left: 12px !important;
		padding-right: 12px !important;
	}
`;

export default ({ data }) => {
	const fields = [
		{
			key: "code",
			label: "Mã sản phẩm",
			_style: { width: "15%", textAlign: "left" },
			sorter: false,
		},
		{
			key: "name",
			label: "Tên sản phẩm",
			_style: { width: "auto", textAlign: "left" },
			sorter: false,
		},
		{
			key: "boughtUnit",
			label: "ĐVT",
			_style: { width: "10%" },
			sorter: false,
		},
		{ key: "quantity", label: "SL", _style: { width: "10%" }, sorter: false },
		{
			key: "price",
			label: "Đơn giá",
			_style: { width: "13%", textAlign: "right" },
			sorter: false,
		},
		{
			key: "total",
			label: "Thành tiền",
			_style: { width: "15%", textAlign: "right" },
			sorter: false,
		},
	];

	const render = {
		code: ({ code }) => <td className="text-left">{code}</td>,
		name: ({ name }) => <td className="text-left">{name}</td>,
		boughtUnit: ({ boughtUnit }) => <td>{boughtUnit}</td>,
		quantity: (item) => <td>{parseFloat(Number(item.quantity).toFixed(3))}</td>,
		price: (item) => <td className="text-right">{money(item.price)}</td>,
		total: ({ total }) => <td className="text-right">{money(total)}</td>,
	};

	return (
		<CRow>
			<CCol>
				<MTable
					data={data}
					fields={fields}
					itemsPerPage={Infinity}
					render={render}
				/>
			</CCol>
		</CRow>
	);
};
