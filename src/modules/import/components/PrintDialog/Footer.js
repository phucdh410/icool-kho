import { CCardText,CCol, CRow } from "@coreui/react";

import { money, spell } from "src/utils/funcs";

export default ({ data }) => {
	return (
		<>
			<CRow>
				<CCol xs="6"></CCol>
				<CCol xs="3">
					<CCardText className="text-right font-weight-bold my-2">
						Tổng tiền hàng:
					</CCardText>
					<CCardText className="text-right font-weight-bold my-2">
						Tổng cộng tiền thanh toán:
					</CCardText>
				</CCol>
				<CCol xs="3">
					<CCardText className="text-right font-weight-bold my-2">
						{money(data.total)}
					</CCardText>
					<CCardText className="text-right font-weight-bold my-2">
						{money(data.total)}
					</CCardText>
				</CCol>
			</CRow>
			<CRow>
				<CCol
					xs="12"
					className="text-right font-weight-bold font-italic text-capitalize"
				>
					( {data.total && spell(parseFloat(Number(data.total).toFixed(0)))}{" "}
					đồng)
				</CCol>
			</CRow>
			<CRow className="mt-4 mb-5 text-center justify-content-between">
				<CCol xs="2">
					<CCardText className="font-weight-bold">KHÁCH HÀNG</CCardText>
				</CCol>
				<CCol xs="2">
					<CCardText className="font-weight-bold">NV GIAO HÀNG</CCardText>
				</CCol>
				<CCol xs="2">
					<CCardText className="font-weight-bold">THỦ KHO</CCardText>
				</CCol>
				<CCol xs="2">
					<CCardText className="font-weight-bold">NGƯỜI LẬP</CCardText>
				</CCol>
				<CCol xs="2">
					<CCardText className="font-weight-bold">ĐD BÁN HÀNG</CCardText>
				</CCol>
			</CRow>
		</>
	);
};
