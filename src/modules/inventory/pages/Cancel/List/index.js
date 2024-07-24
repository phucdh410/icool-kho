import { useCallback, useMemo,useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardBody,CCardHeader } from "@coreui/react";

import { remove } from "src/apis/cancellation_slip.api";
import { history } from "src/App";
import { setFilter } from "src/common/actions/config.action";
import { fireDelete, fireSuccess } from "src/utils/alert";

import { getAll } from "_common/queries-fn/inventory-cancel.query";

import { NAME } from "../../../reducers/inventory-cancel";

import Table from "./Table";
import Toolbar from "./Toolbar";

const selectData = createSelector(
  (state) => state.config,
  (state) => state.inventoryCancel,
  ({ isLoading }, { filters }) => ({ isLoading, filters })
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
          <Table
            loading={isLoading}
            isSelectAll={isSelectAll}
            data={data}
            onSelect={onSelect}
          />
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};

export default InventoryCancel;
