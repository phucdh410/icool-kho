import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import { ERROR_MESSAGE } from "src/configs/constant";
import { UID } from "src/utils/funcs";

import { getUnCheckByGroup } from "_common/queries-fn/material.query";

import Table from "./Table";
import Toolbar from "./Toolbar";

const Form = ({ edit, isLoading, data, onSubmit }) => {
	//#region Data
	const { control, watch, setValue, setError, clearErrors, handleSubmit } =
		useForm({ defaultValues: data });

	const [isLoadingMaterial, setIsLoadingMaterial] = useState(edit);

	const [groupCode, setGroupCode] = useState(null);
	const [status, setStatus] = useState(1);
	const [amounts, setAmounts] = useState({});

	const { data: materials, set } = getUnCheckByGroup(
		{
			storeCode: watch("storeCode"),
			groupCode: groupCode,
			date: watch("checked"),
		},
		!groupCode
	);
	const [inputData, setInputData] = useState([]);

	const isSelectAll = useMemo(() => materials?.every((m) => m.check) ?? false);

	const selected = useMemo(() => materials?.filter((m) => m.check) ?? []);

	const selectedInput = useMemo(() => inputData.filter((m) => m.check) ?? []);

	const summary = useMemo(() => {
		return Object.values(amounts).reduce(
			(t, a) => ({
				total: t.total + (a.wareQ * a.warePrice || 0),
				quantity: t.quantity + (a.wareQ || 0),
			}),
			{ total: 0, quantity: 0 }
		);
	}, [amounts]);
	//#endregion

	//#region Events
	const onStatusChange = useCallback(
		(_status) => setStatus(_status === status ? 0 : _status),
		[status]
	);

	const onAmountChange = (_amounts) => setAmounts(_amounts);

	const onMaterialGroupSelect = useCallback((data) => {
		setGroupCode(data);
		setValue("groupCode", data);
	}, []);

	const onInputRowChange = (d) => setInputData(d);
	const onChange = (d) => set(d);

	const onAdd = () => {
		setInputData([...inputData, { id: UID(), code: "", wareQ: 0 }]);
	};

	const onSave = () => {
		clearErrors();
		handleSubmit(
			(d) => {
				const materialAmounts = Object.values(amounts);

				if (materialAmounts.length) {
					onSubmit({
						...d,
						materials: materialAmounts,
					});
				} else {
					noti("error", ERROR_MESSAGE.NVL.REQUIRED);
					setError("materials", { error: "Required" });
				}
			},
			(e) => noti("error", e)
		)();
	};

	const onRemove = () => {
		let removed = {};

		setInputData(
			inputData.filter((d) => {
				d.check && d.code && (removed[d.code] = 1);
				return !d.check;
			})
		);

		set(
			materials.map((d) => {
				d.check && (removed[d.code] = 1);
				return { ...d, check: false };
			})
		);

		Object.keys(removed).forEach((code) => delete amounts[code]);
		setAmounts({ ...amounts });
	};
	//#endregion

	useEffect(() => {
		if (isLoading || !data) return;

		Object.keys(data).forEach((key) => setValue(key, data[key]));

		setAmounts(
			data.materials?.reduce((obj, m) => ({ ...obj, [m.code]: m }), {}) || {}
		);
	}, [isLoading, data]);

	useEffect(() => {
		if (data && watch("storeCode") && watch("checked") && isLoadingMaterial) {
			setTimeout(() => {
				set(data.materials);
				setIsLoadingMaterial(false);
			}, 100);
		}
	}, [watch("storeCode"), watch("checked"), isLoadingMaterial, data]);

	useEffect(() => setInputData([]), [groupCode]);

	//#region
	return (
		<>
			<CCard className="toolbar sticky">
				<CCardBody>
					<Toolbar
						control={control}
						watch={watch}
						setValue={setValue}
						status={status}
						selectedNo={selected.length}
						onAdd={onAdd}
						onSave={onSave}
						canRemove={selected.length + selectedInput.length}
						onRemove={onRemove}
						onStatusChange={onStatusChange}
						onMaterialGroupSelect={onMaterialGroupSelect}
					/>
				</CCardBody>
			</CCard>
			<CCard>
				<CCardHeader></CCardHeader>
				<CCardBody className="px-0 pt-0">
					<div className="table-responsive">
						<Table
							storeCode={watch("storeCode")}
							date={watch("checked")}
							amounts={amounts}
							data={materials}
							inputData={inputData}
							isSelectAll={isSelectAll}
							onAmountChange={onAmountChange}
							onInputRowChange={onInputRowChange}
							onChange={onChange}
							quantity={summary.quantity}
							total={summary.total}
						/>
					</div>
				</CCardBody>
			</CCard>
		</>
	);
	//#endregion
};

export default Form;
