import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

import { setFilter } from "src/common/actions/config.action";

import { getAll as getAllGroup } from "../../queries-fn/material-group.query";
import { NAME } from "../../reducers/import-detail";

import GroupTable from "./GroupTable";
import MaterialTable from "./MaterialsTable";
import Toolbar from "./Toolbar";

const selectData = createSelector(
  (state) => state.auth,
  (state) => state.summaryImportDetail,
  ({ store_code }, { filters }) => ({
    filters: { ...filters, storeIds: filters.storeIds ?? [store_code] },
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
