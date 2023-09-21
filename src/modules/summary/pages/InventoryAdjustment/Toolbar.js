import React, { useCallback } from "react";

import { Controller, useForm } from "react-hook-form";

import { CRow, CCol } from "@coreui/react";
import { Magnifying } from "_assets/icons";
import { CButton, CDate, CSelectMulti } from "_components/controls";

import { filter as filterFn } from "src/utils/funcs";

import { getAll as getAllMaterialGroups } from "../../queries-fn/material-group.query";
import { getAll as getAllMaterials } from "../../queries-fn/material.query";

import { exportReport } from "src/apis/inventory_adjustment.api";

export default ({ filter, isLoading, stores, onSearch }) => {
	//#region Data
	const { data: materialGroups } = getAllMaterialGroups({}, isLoading);
	const { data: materials } = getAllMaterials({}, isLoading);

	const { control, setValue, getValues, handleSubmit } = useForm({
		defaultValues: filter,
	});
	//#endregion

	//#region Event
	const search = handleSubmit(
		(d) => onSearch(filterFn(d)),
		(e) => noti("error", e)
	);

	const onStoreChange = (value) =>
		setValue(
			"storeIds",
			value?.map((v) => v.value)
		);

	const onMaterialGroupChange = useCallback((value) =>
		setValue(
			"nvlGroupIds",
			value?.map((v) => v.value)
		)
	);

	const onMaterialChange = useCallback((value) =>
		setValue(
			"nvlIds",
			value?.map((v) => v.value)
		)
	);

	const onExport = useCallback(() => {
		exportReport(getValues());
	});
	//#endregion

	return (
		<>
			<CRow>
				<CCol xs="12" className="justify-content-end action">
					<div className="text-right">
						<CButton className="btn-fill" onClick={onExport}>
							Xuất file Excel
						</CButton>
					</div>
				</CCol>
			</CRow>

			<CRow>
				<CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
					<Controller
						name="startAt"
						control={control}
						render={({ field }) => (
							<CDate {...field} label="Từ ngày" required />
						)}
					/>
				</CCol>
				<CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
					<Controller
						name="endAt"
						control={control}
						render={({ field }) => (
							<CDate {...field} label="Đến ngày" required />
						)}
					/>
				</CCol>
				<CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="3">
					<Controller
						name="storeIds"
						control={control}
						render={({ field }) => (
							<CSelectMulti
								{...field}
								isMulti
								label="Cửa hàng"
								placeholder="Tất cả"
								options={stores}
								onChange={onStoreChange}
							/>
						)}
					/>
				</CCol>
				<CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="3">
					<Controller
						name="nvlGroupIds"
						control={control}
						render={({ field }) => (
							<CSelectMulti
								{...field}
								isMulti
								label="Nhóm hàng"
								placeholder="Tất cả"
								options={materialGroups}
								onChange={onMaterialGroupChange}
							/>
						)}
					/>
				</CCol>
				<CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="3">
					<Controller
						name="nvlIds"
						control={control}
						render={({ field }) => (
							<CSelectMulti
								{...field}
								isMulti
								label="Nguyên vật liệu"
								placeholder="Tất cả"
								options={materials}
								onChange={onMaterialChange}
							/>
						)}
					/>
				</CCol>
				<CCol
					xs="12"
					sm="6"
					md="3"
					lg="4"
					xl="2"
					xxl="2"
					className="btn-search"
				>
					<div className="form-group c-input">
						<div>
							<CButton icon={<Magnifying />} onClick={search} className="m-0">
								Tìm kiếm
							</CButton>
						</div>
					</div>
				</CCol>
			</CRow>
		</>
	);
};
