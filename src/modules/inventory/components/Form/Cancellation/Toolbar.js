import { useCallback, forwardRef, useImperativeHandle, useEffect } from "react";

import classNames from "classnames";

import { Controller } from "react-hook-form";

import { useForm } from "react-hook-form";

import { CRow, CCol, CCollapse } from "@coreui/react";

import { CActionGroup } from "_components/others";
import { CInput, CSelect, CNumber, CFile, CButton } from "_components/controls";

import { getAll as getAllWarehouse } from "../../../queries-fn/warehouse.query";
import { getAll as getAllMaterials } from "../../../queries-fn/material.query";

export default forwardRef(
	(
		{
			edit,
			isLoading,
			setWarehouse,
			status,
			setValue,
			watch,
			control,
			selectedMaterials,
			onStatusChange,
			selectedNo,
			onAdd,
			onEdit,
			onApprove,
			onSave,
			onRemove,
		},
		ref
	) => {
		//#region Data
		const { data: warehouses } = getAllWarehouse({}, isLoading);
		const { data: materials } = getAllMaterials(
			{ storeCode: watch("storeCode") },
			isLoading || !watch("storeCode")
		);

		const {
			control: formControl,
			setValue: setFormValue,
			handleSubmit,
			getValues,
		} = useForm();

		//#endregion

		//#region Event
		const toggleCollapse = useCallback(
			() => onStatusChange(1),
			[onStatusChange]
		);

		const submit = handleSubmit(
			(d) => {
				onAdd({ ...d });
				Object.keys(getValues()).forEach((key) => setFormValue(key, null));
			},
			(e) => {}
		);

		const onClick = useCallback(
			(state) => {
				switch (state) {
					case "add":
						return submit();
					case "save":
						return onSave();
					case "remove":
						return onRemove();
				}
			},
			[submit, onEdit, onSave, onRemove]
		);

		const onMaterialsChange = useCallback(({ data }) => {
			setFormValue("code", data.code);
			setFormValue("name", data.name);
			setFormValue("wareUnit", data.wareUnit);
			setFormValue("price", data.warePrice);
		});

		const onWareChange = useCallback(
			({ data, label }) => {
				setValue("storeCode", data.storeCode);
				setValue("wareCode", data.code);
				setWarehouse(label);
			},
			[control, setValue]
		);
		//#endregion

		useImperativeHandle(ref, () => ({ setValue: setFormValue }));

		useEffect(() => {
			if (warehouses) {
				const _find = warehouses.find((w) => w.value === watch("wareCode"));
				_find && setWarehouse(_find.label);
			}
		}, [warehouses, watch("wareCode")]);

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
								canRemove={!!selectedNo && status !== 3}
								status={status}
							/>
						</div>
						{edit && (
							<div>
								<CButton
									className="btn-fill"
									disabled={!selectedNo}
									onClick={onApprove}
								>
									Xác nhận
								</CButton>
							</div>
						)}
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
						<CCol xs="12" sm="6" md="4" lg="4" xl="3" xxl="3">
							<CInput readOnly label="Mã phiếu" value={watch("code")} />
						</CCol>
						<CCol xs="12" sm="6" md="4" lg="4" xl="3" xxl="3">
							<Controller
								name="wareCode"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<CSelect
										label="Tên Kho"
										required
										options={warehouses ?? []}
										readOnly={edit}
										{...field}
										onChange={onWareChange}
									/>
								)}
							/>
						</CCol>
						<CCol xs="12" sm="12" md="4" lg="4" xl="6" xxl="6">
							<Controller
								name="note"
								control={control}
								render={({ field }) => (
									<CInput label="Ghi chú" required {...field} />
								)}
							/>
						</CCol>
					</CRow>
					<CRow className="mt-3">
						<CCol xs="12" sm="6" md="4" lg="4" xl="3" xxl="3">
							<Controller
								name="code"
								control={formControl}
								rules={{ required: true }}
								render={({ field }) => (
									<CSelect
										label="Nguyên Vật Liệu"
										required
										options={materials}
										{...field}
										ignore={selectedMaterials}
										onChange={onMaterialsChange}
									/>
								)}
							/>
						</CCol>
						<CCol xs="12" sm="6" md="4" lg="2" xl="2" xxl="2">
							<Controller
								name="wareQ"
								control={formControl}
								rules={{ required: true }}
								render={({ field }) => (
									<CNumber label="Số lượng" required min={0} {...field} />
								)}
							/>
						</CCol>
						<CCol xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
							<Controller
								name="reason"
								control={formControl}
								rules={{ required: true }}
								render={({ field }) => (
									<CInput label="Nguyên nhân" required {...field} />
								)}
							/>
						</CCol>
						<CCol xs="12" sm="6" md="4" lg="4" xl="3" xxl="3">
							<Controller
								name="files"
								control={formControl}
								rules={{ required: true }}
								render={({ field }) => (
									<CFile label="Hình ảnh" required max="2" {...field} />
								)}
							/>
						</CCol>
					</CRow>
				</CCollapse>
			</>
		);
		//#endregion
	}
);
