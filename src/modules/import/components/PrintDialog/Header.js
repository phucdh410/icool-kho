import moment from "moment";

import { CCardSubtitle, CCardText, CCol, CRow } from "@coreui/react";

export default ({ name, data }) => {
	return (
		<>
			<CRow>
				<CCol xs="8">
					<CCardSubtitle className="mb-0 font-weight-bold">
						{process.env.REACT_APP_COMPANY}
					</CCardSubtitle>
					<CCardText className="mb-0">
						Dịa chỉ: {process.env.REACT_APP_ADDRESS}
					</CCardText>
					<CCardText className="mb-0">
						Số điện thoại: {process.env.REACT_APP_PHONE}
					</CCardText>
				</CCol>
				<CCol xs="4" className="text-right">
					<CCardText>
						<div>{moment().format("DD/MM/YYYY")}</div>
					</CCardText>
				</CCol>
			</CRow>
			<CRow>
				<CCol xs="12">
					<CCardSubtitle className="mt-2 mb-2 text-center font-weight-bold">
						<h4>{name}</h4>
					</CCardSubtitle>
				</CCol>
			</CRow>
			<CRow>
				<CCol xs="6">
					<CCardText className="mb-0">Khách hàng: {data.storeName}</CCardText>
					<CCardText className="mb-0">
						Số điện thoại: {data.storeName}
					</CCardText>
					<CCardText className="mb-0">Địa chỉ: {data.storeName}</CCardText>
				</CCol>
				<CCol xs="3">
					<CCardText className="mb-0">Số ĐĐH: {data.code}</CCardText>
					<CCardText className="mb-0">NVBH: {data.approvedBy ?? ""}</CCardText>
				</CCol>
				<CCol xs="3" className="text-right">
					<CCardText className="mb-0">
						Ngày đặt: {moment(data.createdDate).format("DD/MM/YYYY")}
					</CCardText>
					<CCardText>
						Ngày giao: {moment(data.date).format("DD/MM/YYYY")}
					</CCardText>
				</CCol>
			</CRow>
		</>
	);
};
