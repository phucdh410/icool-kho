import React from "react";
import classNames from "classnames";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { Controller, useForm } from "react-hook-form";
import { CRow, CCol, CCollapse } from "@coreui/react";

import { CInput, CButton, CSelect, CDate } from "_components/controls";
import { CActionGroup } from "_components/others";

import { filter } from "src/utils/funcs";
import { Magnifying } from "_assets/icons";

import { getAll as getAllWarehouse } from "../../../queries-fn/warehouse.query";

import { history } from "src/App";

const selectIsLoading = createSelector(
	(state) => state.config,
	({ isLoading }) => isLoading
);

export default ({
	filter: _filter,
	status,
	selectedNo,
	toggleStatus,
	onEdit,
	onRemove,
	onSearch,
	onExport,
}) => {
	//#region Data
	const isLoading = useSelector(selectIsLoading);
	const { control, handleSubmit } = useForm({
		defaultValues: _filter,
	});

	const { data: warehouses } = getAllWarehouse({}, isLoading);
	//#endregion

	//#region Event
	const toggleCollapse = () => toggleStatus(1);

	const search = handleSubmit(
		(d) => onSearch(filter(d)),
		(e) => noti("error", e)
	);

	const exportExcel = handleSubmit(
		(d) => onExport(filter(d)),
		(e) => noti("error", e)
	);

	const onClick = (state) => {
		switch (state) {
			case "edit":
				return onEdit();
			case "remove":
				return onRemove();
		}
	};
	//#endregion

	return (
		<>
			<CRow>
				<CCol xs="12" className="action">
					<div>
						<CActionGroup
							onClick={onClick}
							canAdd={false}
							canSave={false}
							canEdit={selectedNo == 1}
							canRemove={selectedNo}
							canPrint={false}
						/>
					</div>
					<div>
						<CButton className="btn-fill" to="/inventory-return/form">
							Tạo phiếu trả hàng
						</CButton>
						<CButton className="btn-fill" onClick={exportExcel}>
							Xuất File Excel
						</CButton>
					</div>
					<div
						className={classNames(
							"btn",
							"btn-primary",
							"btn-collapse",
							status == 1 && "show"
						)}
						onClick={toggleCollapse}
					></div>
				</CCol>
			</CRow>

			<CCollapse show={status === 1}>
				<CRow className="mt-3 justify-content-xxl-end">
					<CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
						<Controller
							name="code"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<CInput placeholder="Tất cả" label="Mã Phiếu" {...field} />
							)}
						/>
					</CCol>
					<CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
						<Controller
							name="wareCode"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<CSelect
									label="Kho"
									options={
										warehouses
											? [{ value: "", label: "Tất cả" }, ...warehouses]
											: []
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
							defaultValue=""
							render={({ field }) => <CDate label="Đến ngày" {...field} />}
						/>
					</CCol>
					<CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
						<Controller
							name="date"
							control={control}
							defaultValue=""
							render={({ field }) => <CDate label="Ngày trả" {...field} />}
						/>
					</CCol>
					<CCol
						xs="12"
						sm="6"
						md="5"
						lg="4"
						xl="3"
						xxl="2"
						className="text-xxl-right btn-search"
					>
						<div className="form-group c-input">
							<div>
								<CButton
									icon={<Magnifying />}
									onClick={search}
									className="mr-0"
								>
									Tìm kiếm
								</CButton>
							</div>
						</div>
					</CCol>
				</CRow>
			</CCollapse>
		</>
	);
};