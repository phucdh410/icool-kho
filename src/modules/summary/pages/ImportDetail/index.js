import { useCallback, useEffect, useState } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";

import { CCard, CCardBody, CRow, CCol } from "@coreui/react";

import Toolbar from "./Toolbar";
import MaterialTable from "./MaterialsTable";
import GroupTable from "./GroupTable";

import { getAll as getAllGroup } from "../../queries-fn/material-group.query";
import { setFilter } from "src/common/actions/config.action";
import { NAME } from "../../reducers/import-detail";

const selectData = createSelector(
	(state) => state.auth,
	(state) => state.summaryImportDetail,
	({ storeCode }, { filters }) => ({
		filters: { ...filters, storeIds: filters.storeIds ?? [storeCode] },
	})
);

const ImportSummary = () => {
	const dispatch = useDispatch();
	//#region Data
	const { filters } = useSelector(selectData);

	const [selected, setSelected] = useState([]);

	const { data: materialGroups } = getAllGroup({});
	//#endregion

	//#region Render
	const onSearch = useCallback((value) => dispatch(setFilter(NAME, value)), []);

	const onSelect = useCallback((v) => setSelected(v), []);
	//#endregion

	//#region Render
	return (
		<>
			<CCard>
				<CCardBody>
					<Toolbar
						groups={materialGroups}
						selected={selected}
						onSearch={onSearch}
						filter={filters}
					/>
				</CCardBody>
			</CCard>
			<CRow>
				<CCol xs="12" lg="4">
					<CCard>
						<CCardBody className="px-0">
							<div className="table-responsive" style={{ maxHeight: "500px" }}>
								<MaterialTable onSelect={onSelect} filter={filters} />
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol xs="12" lg="8">
					<CCard>
						<CCardBody className="px-0">
							<div className="table-responsive" style={{ maxHeight: "500px" }}>
								<GroupTable filter={{ ...filters, listCode: selected }} />
							</div>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</>
	);
	//#endregion
};

export default ImportSummary;
