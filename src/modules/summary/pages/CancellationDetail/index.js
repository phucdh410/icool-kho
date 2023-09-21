import { useMemo, useRef, useCallback } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";

import { CCard, CCardBody } from "@coreui/react";
import { CImagePreview } from "src/common/components/others";

import Toolbar from "./Toolbar";
import Table from "./Table";

import { getAll as getAllStores } from "../../queries-fn/store.query";

import { getDetailReport } from "_common/queries-fn/inventory-cancel.query";
import { setFilter } from "src/common/actions/config.action";
import { NAME } from "../../reducers/cancellation-detail";

const selectData = createSelector(
	(state) => state.config,
	(state) => state.auth,
	(state) => state.summaryCancellationDetail,
	({ isLoading }, { storeCode }, { filters }) => ({
		isLoading,
		filters: { ...filters, storeIds: filters.storeIds ?? [storeCode] },
	})
);

const CancellationDetailSummary = () => {
	const previewRef = useRef();

	const dispatch = useDispatch();
	//#region Data
	const { isLoading, filters } = useSelector(selectData);

	const { data, loading } = getDetailReport(filters, isLoading);

	const { data: stores } = getAllStores({}, isLoading);

	const selectedStore = useMemo(() => {
		if (filters.storeIds?.length && stores)
			return filters.storeIds.map((s) => stores.find((_s) => _s.value === s));
		return stores ?? [];
	}, [filters?.storeIds, stores]);
	//#endregion

	//region Events
	const onSearch = (v) => dispatch(setFilter(NAME, v));

	const onPreview = useCallback(
		(path) => (e) => previewRef.current.preview(path),
		[]
	);
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
					/>
				</CCardBody>
			</CCard>
			<CCard>
				<CCardBody className="px-0">
					<Table
						loading={loading}
						data={data}
						stores={selectedStore}
						onPreview={onPreview}
					/>
				</CCardBody>
			</CCard>
			<CImagePreview ref={previewRef} />
		</>
	);
	//#endregion
};

export default CancellationDetailSummary;
