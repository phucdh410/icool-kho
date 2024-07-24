import { useCallback,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardBody,CCardHeader } from "@coreui/react";

import { toExcelByWareCodeAndDate } from "src/apis/backlog_slip.api";
import { setFilter } from "src/common/actions/config.action";

import { getInstants } from "_common/queries-fn/inventory-slip.query";

import { NAME } from "../../../reducers/inventory-slip-instant";

import Table from "./Table";
import Toolbar from "./Toolbar";

const selectData = createSelector(
	(state) => state.config,
	(state) => state.auth,
	(state) => state.inventorySlipInstant,
	(state) => state,
	({ isLoading }, { wareCode }, { filters }) => ({
		isLoading,
		filters: { ...filters, wareCode: filters?.wareCode ?? wareCode },
	})
);

const InventoryInstant = ({}) => {
	const dispatch = useDispatch();

	//#region Data
	const { isLoading, filters } = useSelector(selectData);

	const [status, setStatus] = useState(0);

	const { data, set } = getInstants(filters, isLoading);
	//#endregion

	//#region Event
	const onSelect = (code) => {};
	const onStatusChange = useCallback(
		(_status) => setStatus(_status === status ? 0 : _status),
		[status]
	);
	const onSearch = useCallback(
		(data) => dispatch(setFilter(NAME, data)),
		[dispatch]
	);

	const onExport = useCallback(
		async (data) => await toExcelByWareCodeAndDate(data),
		[]
	);
	//#endregion

	return (
		<>
			<CCard className="toolbar sticky">
				<CCardBody>
					<Toolbar
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

export default InventoryInstant;
