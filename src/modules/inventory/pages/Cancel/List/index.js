import { useState, useCallback, useMemo } from "react";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardHeader, CCardBody } from "@coreui/react";

import Table from "./Table";
import Toolbar from "./Toolbar";

import { getAll } from "_common/queries-fn/inventory-cancel.query";
import { remove } from "src/apis/cancellation_slip.api";

import { history } from "src/App";
import { fireDelete, fireSuccess } from "src/utils/alert";
import { setFilter } from "src/common/actions/config.action";
import { NAME } from "../../../reducers/inventory-cancel";
import { useDispatch } from "react-redux";

const selectData = createSelector(
	(state) => state.config,
	(state) => state.auth,
	(state) => state.inventoryCancel,
	({ isLoading }, { wareCode }, { filters }) => ({
		isLoading,
		filters: { ...filters, wareCode: filters?.wareCode ?? wareCode },
	})
);

const InventoryCancel = ({}) => {
	const dispatch = useDispatch();
	//#region Data
	const { isLoading, filters } = useSelector(selectData);

	const [status, setStatus] = useState(0);

	const { data, set, refetch } = getAll(filters, isLoading);

	const isSelectAll = useMemo(() => data?.every((d) => d.check), [data]);

	const selected = useMemo(
		() => data?.filter((d) => d.check && data.status !== 2) || [],
		[data]
	);
	const deleteSelected = useMemo(
		() => data?.filter((d) => d.check && !data.status) || [],
		[data]
	);
	//#endregion

	//#region Event
	const onEdit = useCallback(async () => {
		const code = data.find((d) => d.check).code;
		history.push(`/inventory-cancel/form/${code}`);
	}, [data]);

	const onRemove = useCallback(async () => {
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
	}, [selected, refetch]);

	const onSelect = (code, v) =>
		set(
			data.map((d) =>
				d.status !== 2 && (code === -1 || d.code === code)
					? { ...d, check: v }
					: d
			)
		);

	const onStatusChange = useCallback(
		(_status) => setStatus(_status === status ? 0 : _status),
		[status]
	);

	const onSearch = useCallback(
		(data) => dispatch(setFilter(NAME, data)),
		[dispatch]
	);

	//#endregion

	//#region Render
	return (
		<>
			<CCard className="toolbar sticky">
				<CCardBody>
					<Toolbar
						filter={filters}
						status={status}
						selectedNo={selected.length}
						deleteSelectdNo={deleteSelected.length}
						toggleStatus={onStatusChange}
						onEdit={onEdit}
						onRemove={onRemove}
						onSearch={onSearch}
					/>
				</CCardBody>
			</CCard>
			<CCard>
				<CCardHeader></CCardHeader>
				<CCardBody className="px-0 pt-0">
					<Table isSelectAll={isSelectAll} data={data} onSelect={onSelect} />
				</CCardBody>
			</CCard>
		</>
	);
	//#endregion
};

export default InventoryCancel;
