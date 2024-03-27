import { useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardHeader, CCardBody } from "@coreui/react";

import Table from "./Table";
import Toolbar from "./Toolbar";

import { getAll } from "_common/queries-fn/inventory-slip.query";
import { toExcel } from "src/apis/backlog_slip.api";

import { NAME } from "../../../reducers/inventory-slip";
import { setFilter } from "src/common/actions/config.action";

const selectData = createSelector(
	(state) => state.config,
	(state) => state.auth,
	(state) => state.inventorySlip,
	({ isLoading }, { wareCode }, { filters }) => ({
		isLoading,
		wareCode,
		filters: { ...filters, wareCode: filters?.wareCode ?? wareCode },
	})
);

const InventorySlip = ({}) => {
	const dispatch = useDispatch();
	//#region data
	const { isLoading, filters } = useSelector(selectData);

	const [status, setStatus] = useState(0);

	const { data, set } = getAll(filters, isLoading);

	//#endregion

	//#region Event

	const onSelect = (code) => {};

	const onStatusChange = useCallback(
		(_status) => setStatus(_status === status ? 0 : _status),
		[status]
	);
	const onSearch = useCallback((data) => dispatch(setFilter(NAME, data)), []);

	const onExport = useCallback(async (data) => await toExcel(data), []);

	//#endregion

	return (
		<>
			<CCard className="toolbar sticky">
				<CCardBody>
					<Toolbar
						isLoading={isLoading}
						filter={filters}
						status={status}
						toggleStatus={onStatusChange}
						onSearch={onSearch}
						onExport={onExport}
					/>
				</CCardBody>
			</CCard>
			<CCard>
				<CCardHeader></CCardHeader>
				<CCardBody className="px-0 pt-0">
					<Table data={data} onSelect={onSelect} />
				</CCardBody>
			</CCard>
		</>
	);
};

export default InventorySlip;
