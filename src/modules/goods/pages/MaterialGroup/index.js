import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useForm } from "react-hook-form";

import { CCard, CCardHeader, CCardBody } from "@coreui/react";

import Toolbar from "./Toolbar";
import Table from "./Table";

import { getAll } from "_common/queries-fn/material-group.query";
import { fireDelete, fireSuccess, fireError } from "src/utils/alert";
import { create, remove, update } from "src/apis/material_group.api";

const selectIsLoading = createSelector(
	(state) => state.config,
	({ isLoading }) => isLoading
);

const MaterialGroupList = () => {
	//#region Data
	const isLoading = useSelector(selectIsLoading);

	const [status, setStatus] = useState(0);

	const [params, setParams] = useState({});

	const { control, reset, handleSubmit } = useForm();
	const { data, loading, refetch, set } = getAll(params, isLoading);

	const isSelectAll = useMemo(() => data?.every((d) => d.check), [data]);

	const selected = useMemo(() => data?.filter((d) => d.check) || []);
	//#endregion

	//#region Events
	const select = useCallback(
		(code, v) =>
			set(
				data.map((d) =>
					code === -1 || d.code === code ? { ...d, check: v } : d
				)
			),
		[data]
	);

	const onStatusChange = useCallback(
		(_status) => setStatus(_status === status ? 0 : _status),
		[status]
	);

	const onSearch = useCallback((data) => setParams(data), []);

	const onAdd = useCallback(async (data) => {
		const res = await create(data);
		if (res) {
			refetch();
			setStatus(0);
		}
	}, []);

	const onEdit = useCallback((data) => {
		handleSubmit(
			async (d) => {
				const res = await update(d);

				if (res) {
					refetch();
					setStatus(0);
				}
			},
			(e) => noti("error", "error")
		)();
	}, []);

	const onExport = useCallback((data) => {});

	const onRemove = useCallback(async () => {
		const confirm = await fireDelete();

		if (confirm) {
			remove(selected.map((d) => d.code)).then((res) => {
				if (res) {
					fireSuccess();
					refetch();
				} else fireError();
			});
		}
	}, [selected]);
	//#endregion

	useEffect(() => {
		if (status === 3) reset({ ...data.find((d) => !!d.check) });
	}, [status]);

	useEffect(() => {
		if (selected.length !== 1 && status === 3) setStatus(0);
	}, [selected]);

	return (
		<>
			<CCard className="toolbar sticky">
				<CCardBody>
					<Toolbar
						status={status}
						selectedNo={selected.length}
						toggleStatus={onStatusChange}
						onSearch={onSearch}
						onAdd={onAdd}
						onEdit={onEdit}
						onExpor={onExport}
						onRemove={onRemove}
					/>
				</CCardBody>
			</CCard>
			<CCard>
				<CCardHeader></CCardHeader>
				<CCardBody className="px-0 pt-0">
					<Table
						status={status}
						control={control}
						data={data}
						loading={loading}
						isSelectAll={isSelectAll}
						onSelect={select}
					/>
				</CCardBody>
			</CCard>
		</>
	);
};

export default MaterialGroupList;
