import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CRow, CCol, CCard, CCardBody } from "@coreui/react";
import { CImagePreview } from "src/common/components/others";

import Toolbar from "./Toolbar";
import Table from "./Table";
import Form from "./Form";
import FormInput from "./FormInput";

import { getAll } from "_common/queries-fn/inventory-adjustment.query";
import {
	getByCode,
	create,
	update,
	remove,
} from "src/apis/inventory_adjustment.api";

import { fireDelete, fireSuccess } from "src/utils/alert";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";
import { getAll as getAllWarehouse } from "../../../queries-fn/warehouse.query";
import { isSuccess } from "src/utils/funcs";
import { setFilter } from "src/common/actions/config.action";
import { NAME } from "../../../reducers/inventory-adjustment";

const selectData = createSelector(
	(state) => state.config,
	(state) => state.auth,
	(state) => state.inventoryAdjustment,
	({ isLoading }, { wareCode }, { filters }) => ({
		isLoading,
		filters: { ...filters, wareCode: filters?.wareCode ?? wareCode },
	})
);

const InventoryAdjustment = () => {
	const formRef = useRef();
	const materialRef = useRef();
	const preview = useRef();

	const dispatch = useDispatch();

	//#region Data
	const { isLoading, filters } = useSelector(selectData);

	const { data: warehouses } = getAllWarehouse({}, isLoading);

	const [storeCode, setStoreCode] = useState("");

	const [status, setStatus] = useState(0);

	const [code, setCode] = useState(null);

	const { data, set, refetch } = getAll(filters, isLoading);

	const isSelectAll = useMemo(() => data?.every((d) => d.check), [data]);

	const selected = useMemo(() => data?.filter((d) => d.check) || []);

	const ignore = useMemo(() => data?.map((d) => d.code) ?? [], [data]);
	//#endregion

	//#region Event
	const onSelect = (code, value) => {
		set(
			data.map((d) =>
				code === -1 || d.code === code ? { ...d, check: value } : d
			)
		);
	};

	const onStatusChange = useCallback(
		(_status) => setStatus(_status === status ? 0 : _status),
		[status]
	);

	const onSearch = useCallback((data) => dispatch(setFilter(NAME, data)), []);

	const onAdd = () => {
		setCode(null);
		onStatusChange(2);
	};

	const onEdit = async () => {
		if (status === 3) {
			setCode(null);
			setStatus(0);
		} else {
			const form = data.find((d) => d.check);
			form && setCode(form.code);
		}
	};

	const onSave = async (_data) => {
		if (status === 2) {
			const res = await create(_data);

			if (isSuccess(res)) {
				refetch();
				onStatusChange(0);
				noti("success", SUCCESS_MESSAGE.INVENTORY_ADJUSTMENT.CREATE);
			} else {
				noti("error", ERROR_MESSAGE.INVENTORY_ADJUSTMENT.CREATE);
			}
		} else if (status === 3) {
			materialRef.current.submit(async (materials) => {
				_data.code = code;
				_data.materials = materials;

				const res = await update(_data);

				if (isSuccess(res)) {
					refetch();
					setCode(null);
					onStatusChange(0);
					noti("success", SUCCESS_MESSAGE.INVENTORY_ADJUSTMENT.UPDATE);
				} else {
					noti("success", ERROR_MESSAGE.INVENTORY_ADJUSTMENT.UPDATE);
				}
			});
		}
	};

	const onRemove = async () => {
		const allow = await fireDelete();
		if (allow) {
			const res = await remove(selected.map((s) => s.code));

			if (res.exitcode == 200) {
				refetch();
				fireSuccess();
			} else {
				fireError();
			}
		}
	};

	const onPreview = (file, fileName) => (e) => {
		e.preventDefault();
		preview.current.preview(file, fileName);
	};

	const onStoreChange = (v) => {};
	//#endregion

	useEffect(async () => {
		if (!code) return;
		getByCode(code).then((_res) => {
			formRef.current.setData(_res);
			setStoreCode(_res.storeCode);
			onStatusChange(3);
		});
	}, [code]);

	//#region Render
	return (
		<>
			<CCard className="toolbar sticky">
				<CCardBody>
					<Toolbar
						warehouses={warehouses}
						filter={filters}
						onSearch={onSearch}
					/>
				</CCardBody>
			</CCard>
			<CRow>
				<CCol xs="12" sm="12" md="5" lg="5" xl="5">
					<CCard className="bg-light-blue">
						<CCardBody>
							<CCard>
								<CCardBody>
									<FormInput
										ref={formRef}
										onAdd={onAdd}
										onEdit={onEdit}
										onRemove={onRemove}
										onSave={onSave}
										onStoreChange={onStoreChange}
										refetch={refetch}
										selectedNo={selected.length}
										status={status}
										warehouses={warehouses}
									/>
								</CCardBody>
							</CCard>
							<CCard className="mt-2">
								<CCardBody className="px-0">
									<Table
										data={data}
										isSelectAll={isSelectAll}
										onPreview={onPreview}
										onSelect={onSelect}
										status={status}
									/>
								</CCardBody>
							</CCard>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol xs="12" sm="12" md="7" lg="7" xl="7">
					<CCard className="bg-light-blue">
						<CCardBody>
							<Form
								ref={materialRef}
								isLoading={isLoading}
								code={code}
								storeCode={storeCode}
								ignore={ignore}
							/>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>

			<CImagePreview ref={preview} />
		</>
	);
	//#endregion
};

export default InventoryAdjustment;
