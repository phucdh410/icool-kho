import { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardHeader, CCardBody } from "@coreui/react";

import Toolbar from "./Toolbar";
import Table from "./Table";

import { getAll } from "_common/queries-fn/inventory-check.query";
import { remove, approve, getUnFulfilled } from "src/apis/inventory_slip.api";

import { history } from "src/App";
import { fireDelete, fireSuccess } from "src/utils/alert";
import { setFilter } from "src/common/actions/config.action";
import { NAME } from "../../../reducers/inventory-check";
import { useQuery } from "react-query";

const selectData = createSelector(
  (state) => state.config,
  (state) => state.auth,
  (state) => state.inventoryCheck,
  ({ isLoading }, { wareCode }, { filters }) => ({
    isLoading,
    filters: { ...filters, wareCode: filters?.wareCode ?? wareCode },
  })
);

const InventoryCheck = () => {
  const dispatch = useDispatch();
  //#region Data
  const { isLoading, filters } = useSelector(selectData);

  const [isFetching, setFetching] = useState(false);

  const [status, setStatus] = useState(0);

  const { data, set, refetch } = getAll(filters, isLoading, {
    onSuccess: () => setFetching(false),
  });

  const isSelectAll = useMemo(() => data?.every((d) => d.check), [data]);

  const selected = useMemo(
    () => (isFetching ? [] : data?.filter((d) => d.check) || []),
    [data, isFetching]
  );

  const { data: response } = useQuery({
    queryKey: ["unfulfilled"],
    queryFn: () => getUnFulfilled(),
  });

  const chua_kiem_store_list = useMemo(() => {
    if (response?.data) {
      return response.data.map((e) => e.name).join(", ");
    } else return "";
  }, [response]);
  //#endregion

  //#region Events
  const select = useCallback(
    (code, v) =>
      set(
        data?.map((d) =>
          code === -1 || d.code === code ? { ...d, check: v } : d
        )
      ),
    [data]
  );

  const onStatusChange = useCallback(
    (_status) => setStatus(_status === status ? 0 : _status),
    [status]
  );

  const onSearch = useCallback((data) => dispatch(setFilter(NAME, data)), []);

  const onApproved = useCallback(async () => {
    setFetching(true);
    const res = await approve({
      code: selected.map((m) => m.code),
      status: 1,
    });

    if (res.exitcode === 200) {
      refetch();
    } else {
      setFetching(false);
    }
  }, [selected]);

  const onEdit = useCallback(async () => {
    const code = data.find((d) => d.check).code;
    history.push(`/inventory-check/form/${code}`);
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

  const onExport = useCallback(async () => {
    // await toExcel(data);
  }, []);
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
            onApproved={onApproved}
            onRemove={onRemove}
            onSearch={onSearch}
            onExport={onExport}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader></CCardHeader>
        <p
          style={{ paddingInline: "16px", color: "#F26464", fontSize: "16px" }}
        >
          <i>Thông báo:</i>&nbsp;Còn chi nhánh&nbsp;
          <span style={{ fontWeight: 500 }}>{chua_kiem_store_list}</span>&nbsp;
          chưa kiểm kho
        </p>
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

export default InventoryCheck;
