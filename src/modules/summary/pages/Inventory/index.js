import { useMemo } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import Toolbar from "./Toolbar";
import Table from "./Table";

import { getAll as getAllStores } from "../../queries-fn/store.query";

import { getAllReport } from "_common/queries-fn/inventory-check.query";
import { setFilter } from "src/common/actions/config.action";
import { format } from "src/utils/moment";
import { NAME } from "../../reducers/inventory";

const selectData = createSelector(
	(state) => state.config,
	(state) => state.auth,
	(state) => state.summaryInventory,
	({ isLoading }, { storeCode }, { filters }) => ({
		isLoading,
		filters: { ...filters, storeIds: filters.storeIds ?? [storeCode] },
	})
);

const CancellationSummary = () => {
	const dispatch = useDispatch();
	//#region Data
	const { isLoading, filters } = useSelector(selectData);

	const { data, loading } = getAllReport(filters, isLoading);

	const { data: stores } = getAllStores({}, isLoading);

	const selectedStore = useMemo(() => {
		if (filters.storeIds?.length && stores)
			return filters.storeIds.map((s) => stores.find((_s) => _s.value === s));
		return stores ?? [];
	}, [filters?.storeIds, stores]);
	//#endregion

	//region Events
	const onExport = () => {};

	const onSearch = (v) => dispatch(setFilter(NAME, v));
	//#endregion

	//#region Render
	return (
		<>
			<CCard>
				<CCardBody className="toolbar sticky">
					<Toolbar
						filter={filters}
						isLoading={isLoading}
						stores={stores}
						onSearch={onSearch}
						onExport={onExport}
					/>
				</CCardBody>
			</CCard>
			<CCard>
				<CCardHeader>
					<div className="d-flex align-items-baseline" style={{ gap: "12px" }}>
						<h4 className="m-0 text-icool-blue">Báo cáo kiểm kho</h4>
						<span className="text-blue">
							(Từ ngày <strong>{format(filters.startAt)}</strong> đến ngày{" "}
							<strong>{format(filters.endAt)}</strong>)
						</span>
					</div>
				</CCardHeader>
				<CCardBody className="px-0">
					<Table loading={loading} data={data} stores={selectedStore} />
				</CCardBody>
			</CCard>
		</>
	);
	//#endregion
};

export default CancellationSummary;
