import { useState, useCallback, useMemo } from "react";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardHeader, CCardBody } from "@coreui/react";

import Table from "./Table";
import Toolbar from "./Toolbar";

import { getAll } from "_common/queries-fn/inventory-return.query";
import { remove } from "src/apis/return_slip.api";

import { history } from "src/App";
import { fireDelete, fireSuccess } from "src/utils/alert";
import { useDispatch } from "react-redux";
import { setFilter } from "src/common/actions/config.action";

const selectData = createSelector(
  (state) => state.config,
  (state) => state.inventoryReturn,
  ({ isLoading }, { filters }) => ({ isLoading, filters })
);

const InventoryReturn = ({}) => {
  const dispatch = useDispatch();

  const { isLoading, filters } = useSelector(selectData);

  const [status, setStatus] = useState(0);

  const { data, set, refetch } = getAll(filters, isLoading);

  const isSelectAll = useMemo(() => data?.every((d) => d.check), [data]);

  const selected = useMemo(() => data?.filter((d) => d.check) || []);

  //#render Events
  const onEdit = useCallback(async () => {
    const code = data.find((d) => d.check).code;
    history.push(`/inventory-return/form/${code}`);
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

  const select = (code, v) =>
    set(
      data?.map((d) =>
        code === -1 || d.code === code ? { ...d, check: v } : d
      )
    );

  const onStatusChange = useCallback(
    (_status) => setStatus(_status === status ? 0 : _status),
    [status]
  );

  const onSearch = useCallback((data) => dispatch(setFilter(data)), []);
  //#endregion

  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            filter={filters}
            status={status}
            selectedNo={selected.length}
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
            onSelect={select}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default InventoryReturn;
