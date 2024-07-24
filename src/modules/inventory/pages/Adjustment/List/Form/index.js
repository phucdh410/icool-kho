import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
} from "react";
import { Controller, useForm } from "react-hook-form";

import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

import {
	ENTITY_GROUP_CODE,
	ERROR_MESSAGE,
	PERMISSION_VALUE,
} from "src/configs/constant";
import { Can } from "src/utils/ability";
import { isFloatByUnit } from "src/utils/funcs";

import { PlusCircle, Trash } from "_assets/icons";
import { getMaterials } from "_common/queries-fn/inventory-adjustment.query";
import { CButton, CInput, CNumber,CSelect } from "_components/controls";

import { getAll as getAllMaterials } from "../../../../queries-fn/material.query";

import MaterialTable from "./MaterialTable";

const initial = {
	code: "",
	name: "",
	warePrice: 0,
	wareQ: 0,
	wareUnit: "",
};

export default forwardRef(({ isLoading, storeCode, code, ignore }, ref) => {
	//#region Data
	const { control, watch, getValues, setValue, reset, handleSubmit } = useForm({
		defaultValues: initial,
	});

	const { data, set } = getMaterials(code, !code);

	const { data: _materials } = getAllMaterials(
		{ storeCode },
		isLoading || !storeCode
	);

	const materials = useMemo(
		() =>
			_materials?.filter(({ value }) => !data?.find((d) => d.code === value)) ??
			[],
		[data, _materials]
	);

	const total = useMemo(() => {
		return watch("warePrice") * watch("wareQ") || 0;
	}, [watch("warePrice"), watch("wareQ")]);

	const isFloat = useMemo(
		() => isFloatByUnit(getValues("unit")),
		[watch("unit")]
	);

	const isSelectedAll = useMemo(
		() => data?.every((d) => d.approvedStatus || d.check) ?? false,
		[data]
	);

	const selected = useMemo(() => data?.filter((d) => d.check) ?? [], [data]);
	//#endregion

	//#region Event
	const onChange = (_data) => set(_data);

	const onAdd = handleSubmit(
		(d) => {
			if (!data) return;
			set([{ ...d, total, approvedStatus: false }, ...data]);
			reset(initial);
		},
		(e) => {
			if (e["code"])
				noti("error", ERROR_MESSAGE.INVENTORY_ADJUSTMENT.MATERIAL_REQUIRED);
			else if (e["wareQ"])
				noti("error", ERROR_MESSAGE.INVENTORY_ADJUSTMENT.QUANTITY_REQUIRED);
		}
	);

	const submit = (callback) => {
		callback(data);
	};

	const onRemove = () => set(data.filter((d) => !d.check));

	const onApprove = () => {
		set(
			data.map((d) =>
				d.check ? { ...d, check: false, approvedStatus: true } : d
			)
		);
	};

	const onMaterialChange = ({ data: _data }) => {
		setValue("name", _data.name);
		setValue("wareUnit", _data.wareUnit);
		setValue("price", _data.warePrice);
		setValue("code", _data.code);
	};
	//#endregion

	useImperativeHandle(ref, () => ({
		submit,
	}));

	useEffect(() => {
		if (!code) reset(initial);
	}, [code]);

	//#region Render
	return (
		<>
			<CCard>
				<CCardBody>
					<div className="btn-group">
						<CButton
							icon={<PlusCircle />}
							disabled={!code}
							color={"primary"}
							onClick={onAdd}
						>
							Thêm
						</CButton>
						<CButton
							icon={<Trash />}
							disabled={!code || !selected.length}
							color="danger"
							onClick={onRemove}
						>
							Xóa
						</CButton>
					</div>
					<CRow className="mt-3">
						<CCol>
							<CInput readOnly value={watch("code")} label="Mã NVL" />
						</CCol>
						<CCol>
							<Controller
								control={control}
								name="code"
								rules={{ required: true }}
								render={({ field }) => (
									<CSelect
										readOnly={!code}
										ignore={ignore}
										label="Tên NVL"
										options={materials}
										required
										{...field}
										onChange={onMaterialChange}
									/>
								)}
							/>
						</CCol>
						<CCol>
							<Controller
								control={control}
								name="wareQ"
								rules={{ required: true, min: -999, max: 999 }}
								render={({ field }) => (
									<CNumber
										disabled={!code}
										isFloat={isFloat}
										label="Số lượng"
										min="-999"
										max="999"
										required
										{...field}
									/>
								)}
							/>
						</CCol>
					</CRow>
				</CCardBody>
			</CCard>

			<Can
				do={PERMISSION_VALUE.APPROVE}
				on={ENTITY_GROUP_CODE.INVENTORY_ADJUSTMENT}
			>
				<div className="text-right mb-2">
					<div className="mr-4">
						<CButton
							onClick={onApprove}
							disabled={!selected.length}
							className="btn-fill mr-0 px-4"
						>
							Xác nhận
						</CButton>
					</div>
				</div>
			</Can>

			<CCard>
				<CCardBody className="px-0">
					<div className="table-responsive">
						<MaterialTable
							materials={data}
							isSelectedAll={isSelectedAll}
							onChange={onChange}
						/>
					</div>
				</CCardBody>
			</CCard>
		</>
		//#endregion
	);
});
