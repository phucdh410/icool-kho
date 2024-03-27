import { Controller, useForm } from "react-hook-form";
import { CRow, CCol } from "@coreui/react";

import { CInput, CButton, CSelect, CDate } from "_components/controls";

import { filter } from "src/utils/funcs";
import { Magnifying } from "_assets/icons";

export default ({ warehouses, filter: _filter, onSearch }) => {
	//#region Data

	const { control, handleSubmit } = useForm({
		defaultValues: _filter,
	});

	//#endregion

	//#region Event

	const search = handleSubmit(
		(d) => onSearch(filter(d)),
		(e) => noti("error", e)
	);

	//#endregion

	return (
		<>
			<CRow>
				<CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
					<Controller
						name="code"
						control={control}
						render={({ field }) => <CInput label="Mã Phiếu" {...field} />}
					/>
				</CCol>
				<CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
					<Controller
						name="wareCode"
						control={control}
						render={({ field }) => (
							<CSelect
								label="Kho"
								options={
									warehouses && warehouses.length > 2
										? [{ value: "", label: "Tất cả" }, ...warehouses]
										: warehouses
								}
								placeholder="Tất cả"
								{...field}
								onChange={(v) => field.onChange(v.value)}
							/>
						)}
					/>
				</CCol>
				<CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
					<Controller
						name="startAt"
						control={control}
						render={({ field }) => <CDate label="Ngày" {...field} />}
					/>
				</CCol>
				<CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
					<Controller
						name="endAt"
						control={control}
						render={({ field }) => <CDate label="Đến ngày" {...field} />}
					/>
				</CCol>
				<CCol
					xs="12"
					sm="6"
					md="5"
					lg="4"
					xl="3"
					xxl="2"
					className="btn-search"
				>
					<div className="form-group c-input">
						<div>
							<CButton icon={<Magnifying />} onClick={search} className="mr-0">
								Tìm kiếm
							</CButton>
						</div>
					</div>
				</CCol>
			</CRow>
		</>
	);
};
