import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { CRow, CCol } from "@coreui/react";

import { CInput } from "_components/controls";

let _timeout = null;

export default ({ onSearch }) => {
	const { control, watch, getValues } = useForm({ mode: "onChange" });

	useEffect(() => {
		clearTimeout(_timeout)
		_timeout = setTimeout(() => onSearch(getValues()), 500)
		return () => clearTimeout(_timeout);
	}, [watch("code"), watch("name")])

	return (
		<CRow>
			<CCol xs="12">
				<h5 className="text-icool-blue text-center">
					DANH SÁCH NGUYÊN VẬT LIỆU
				</h5>
			</CCol>
			<CCol xs="12" sm="12" md="6" lg="6" xl="6" style={{ maxWidth: "450px" }}>
				<Controller
					name="code"
					control={control}
					defaultValue=""
					render={({ field }) => <CInput label="Mã NVL" {...field} />}
				/>
			</CCol>
			<CCol xs="12" sm="12" md="6" lg="6" xl="6" style={{ maxWidth: "450px" }}>
				<Controller
					name="name"
					control={control}
					defaultValue=""
					render={({ field }) => <CInput label="Tên NVL" {...field} />}
				/>
			</CCol>
		</CRow>
	);
};
