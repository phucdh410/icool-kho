import { useCallback, useEffect } from "react";
import { Controller } from "react-hook-form";
import classNames from "classnames";

import { CCol, CCollapse,CRow } from "@coreui/react";

import { CDate,CInput, CSelect } from "_components/controls";
import { CActionGroup } from "_components/others";

import { getAll as getAllSupplier } from "../../queries-fn/supplier.query";
import { getAll as getAllWarehouse } from "../../queries-fn/warehouse.query";

export default ({
	isLoading,
	status,
	watch,
	control,
	setValue,
	onStatusChange,
	selectedNo,
	onAdd,
	onSave,
	onRemove,
}) => {
	//#region Data
	const { data: warehouses } = getAllWarehouse({}, isLoading);
	const { data: suppliers } = getAllSupplier({}, isLoading);
	//#endregion

	//#region Event
	const toggleCollapse = useCallback(() => onStatusChange(1), [onStatusChange]);

	const onClick = useCallback(
		(state) => {
			switch (state) {
				case "add":
					return onAdd();
				case "save":
					return onSave();
				case "remove":
					return onRemove();
			}
		},
		[onAdd, onSave, onRemove]
	);

	const changeWarehouse = useCallback(({ value, data }) => {
		setValue("wareCode", value);

		setValue("wareAddress", data.address);
		setValue("storeCode", data.storeCode);
	}, []);

	const changeSupplier = useCallback(({ value }) => {
		setValue("supplier", value);
	});
	//#endregion

	useEffect(() => {
		if (warehouses && watch("wareCode")) {
			const warehouse = warehouses.find((s) => s.value == watch("wareCode"));

			setValue("wareAddress", warehouse.data.address);
			setValue("storeCode", warehouse.data.storeCode);
		}
	}, [warehouses, watch("storeCode")]);

	//#region Render
	return (
		<>
			<CRow>
				<CCol xs="12" className="action">
					<div>
						<CActionGroup
							onClick={onClick}
							canAdd={true}
							canSave={true}
							canEdit={false}
							canRemove={selectedNo}
						/>
					</div>
					<div
						className={classNames(
							"btn",
							"btn-primary",
							"btn-collapse",
							"extend",
							status == 1 && "show"
						)}
						onClick={toggleCollapse}
					></div>
				</CCol>
			</CRow>
			<CCollapse show={status === 1}>
				<CRow className="mt-3">
					<CCol xs="12" sm="6" md="4" lg="3" xl="2" xxl="3">
						<CInput
							label="Số đơn hàng"
							readOnly
							control={control}
							value={watch("code")}
						/>
					</CCol>
					<CCol xs="12" sm="6" md="4" lg="3" xl="3" xxl="3">
						<Controller
							name="wareCode"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<CSelect
									label="Kho"
									required
									options={warehouses}
									{...field}
									onChange={changeWarehouse}
								/>
							)}
						/>
					</CCol>
					<CCol xs="12" sm="12" md="4" lg="3" xl="5" xxl="4">
						<CInput
							label="Địa chỉ"
							required
							readOnly
							control={control}
							value={watch("wareAddress")}
						/>
					</CCol>
					<CCol xs="12" sm="12" md="4" lg="3" xl="2" xxl="2">
						<Controller
							name="date"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<CDate
									maxDate={Date.now()}
									label="Ngày nhập"
									required
									{...field}
								/>
							)}
						/>
					</CCol>
					<CCol xs="12" sm="12" md="4" lg="3" xl="3" xxl="3">
						<Controller
							name="supplier"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<CSelect
									options={suppliers}
									label="Nhà cung cấp"
									required
									{...field}
									onChange={changeSupplier}
								/>
							)}
						/>
					</CCol>
					<CCol xs="12" sm="12" md="12" lg="9" xl="9" xxl="9">
						<Controller
							name="note"
							control={control}
							defaultValue=""
							render={({ field }) => <CInput label="Ghi chú" {...field} />}
						/>
					</CCol>
				</CRow>
			</CCollapse>
		</>
	);
	//#endregion
};
